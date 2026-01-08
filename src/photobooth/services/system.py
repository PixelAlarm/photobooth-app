"""
_summary_
"""

import logging
import os
import platform
import subprocess
import sys
from importlib.metadata import PackageNotFoundError, version
from pathlib import Path
from typing import Literal

from .base import BaseService

logger = logging.getLogger(__name__)

# constants
SERVICE_NAME = "photobooth-app"
PIP_PKG_NAME = "photobooth-app"
PHOTOBOOTH_APP_SERVICE_FILE = Path(f"{str(Path.home())}/.local/share/systemd/user/photobooth-app.service")
MACOS_LABEL_NAME = "com.photobooth-app"
PHOTOBOOTH_APP_PLIST_FILE = Path(f"{str(Path.home())}/Library/LaunchAgents/{MACOS_LABEL_NAME}.plist")


class SystemService(BaseService):
    """_summary_"""

    def __init__(self):
        super().__init__()

    def start(self):
        super().start()
        pass
        super().started()

    def stop(self):
        super().stop()
        pass
        super().stopped()

    def util_systemd_control(self, state: Literal["start", "stop", "restart"]):
        if platform.system() == "Linux":
            self._util_systemd_control_linux(state)
        elif platform.system() == "Darwin":
            self._util_launchd_control_macos(state)
        else:
            raise RuntimeError("service control supported on linux and macos platform only")

    def _util_systemd_control_linux(self, state: Literal["start", "stop", "restart"]):
        try:
            # will return 0 for active else inactive.
            subprocess.run(args=["systemctl", "--user", "is-active", "--quiet", SERVICE_NAME], timeout=10, check=True)
        except subprocess.CalledProcessError as exc:
            # non zero returncode
            logger.warning(f"service {SERVICE_NAME} currently inactive, need to restart by yourself! error {exc}")
        except Exception as exc:
            logger.error(f"error: {exc}")

        else:
            # no error, service restart ok
            logger.info(f"service {SERVICE_NAME} currently active, restarting")
            subprocess.run(["systemctl", "--user", state, SERVICE_NAME])

    def _util_launchd_control_macos(self, state: Literal["start", "stop", "restart"]):
        uid = os.getuid()
        service_target = f"gui/{uid}/{MACOS_LABEL_NAME}"

        try:
            # check if service is loaded
            subprocess.run(args=["launchctl", "print", service_target], timeout=10, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        except subprocess.CalledProcessError:
            logger.warning(f"service {service_target} currently not loaded/active")
            return
        except Exception as exc:
            logger.error(f"error checking service status: {exc}")
            return

        logger.info(f"service {service_target} currently active, applying state: {state}")
        try:
            if state == "stop":
                # stop the service. since KeepAlive is true in plist, it will be restarted by launchd automatically!
                # if the user wants to stop it permanently, they should uninstall the service.
                subprocess.run(["launchctl", "kill", "SIGTERM", service_target], check=True)
            elif state == "start":
                subprocess.run(["launchctl", "kickstart", service_target], check=True)
            elif state == "restart":
                # -k: kill the running instance before restarting
                subprocess.run(["launchctl", "kickstart", "-k", service_target], check=True)
        except Exception as exc:
            logger.error(f"error executing {state} on {service_target}: {exc}")

    def install_service(self):
        # install booth service

        if platform.system() == "Linux":
            self._install_service_linux()
        elif platform.system() == "Darwin":
            self._install_service_macos()
        else:
            raise RuntimeError("install service supported on linux and macos platform only")

    def _install_service_linux(self):
        # check if app is installed via pip; if so can install service
        try:
            version(PIP_PKG_NAME)
        except PackageNotFoundError as exc:
            raise RuntimeError("photobooth not installed as pip package, service install only supported for pip installs") from exc

        # install service file and enable
        path_photobooth_service_file = Path(__file__).parent.parent.joinpath("scripts", "systemservice", "photobooth-app.service").resolve()
        path_photobooth_working_dir = Path.cwd().resolve()
        with open(path_photobooth_service_file, encoding="utf-8") as fin:
            PHOTOBOOTH_APP_SERVICE_FILE.parent.mkdir(exist_ok=True, parents=True)
            with open(PHOTOBOOTH_APP_SERVICE_FILE, "w", encoding="utf-8") as fout:
                for line in fin:
                    line_out = line

                    line_out = line_out.replace("##working_dir##", os.path.normpath(path_photobooth_working_dir))
                    line_out = line_out.replace("##sys_executable##", sys.executable)

                    fout.write(line_out)

            logger.info(f"created service file '{PHOTOBOOTH_APP_SERVICE_FILE}'")
            logger.info(f"using working directory '{path_photobooth_working_dir}'")
            logger.info(f"using sys_executable '{sys.executable}'")
        try:
            subprocess.run("systemctl --user enable photobooth-app.service", shell=True)
            logger.info("service enabled")
        except Exception as exc:
            raise RuntimeError("error enable the service") from exc

    def _install_service_macos(self):
        # check if app is installed via pip; if so can install service
        try:
            version(PIP_PKG_NAME)
        except PackageNotFoundError as exc:
            raise RuntimeError("photobooth not installed as pip package, service install only supported for pip installs") from exc

        # install service file and enable
        path_photobooth_plist_file = Path(__file__).parent.parent.joinpath("scripts", "systemservice", "com.photobooth-app.plist").resolve()
        path_photobooth_working_dir = Path.cwd().resolve()
        
        with open(path_photobooth_plist_file, encoding="utf-8") as fin:
            PHOTOBOOTH_APP_PLIST_FILE.parent.mkdir(exist_ok=True, parents=True)
            with open(PHOTOBOOTH_APP_PLIST_FILE, "w", encoding="utf-8") as fout:
                for line in fin:
                    line_out = line

                    line_out = line_out.replace("##working_dir##", os.path.normpath(path_photobooth_working_dir))
                    line_out = line_out.replace("##sys_executable##", sys.executable)

                    fout.write(line_out)

            logger.info(f"created service file '{PHOTOBOOTH_APP_PLIST_FILE}'")
            logger.info(f"using working directory '{path_photobooth_working_dir}'")
            logger.info(f"using sys_executable '{sys.executable}'")

        try:
            # launchctl load -w replaces enable and start
            # -w overrides the Disabled key and sets it to false (enabling the service)
            subprocess.run(["launchctl", "load", "-w", str(PHOTOBOOTH_APP_PLIST_FILE)], check=True)
            logger.info("service enabled and loaded")
        except Exception as exc:
            raise RuntimeError("error enable the service") from exc

    def uninstall_service(self):
        # uninstall booth service

        if platform.system() == "Linux":
            self._uninstall_service_linux()
        elif platform.system() == "Darwin":
            self._uninstall_service_macos()
        else:
            raise RuntimeError("uninstall service supported on linux and macos platform only")

    def _uninstall_service_linux(self):
        try:
            subprocess.run("systemctl --user disable photobooth-app.service", shell=True)
        except Exception as exc:
            raise RuntimeError("error disable the service") from exc

        try:
            os.remove(PHOTOBOOTH_APP_SERVICE_FILE)
        except Exception as exc:
            raise RuntimeError("could not delete service file") from exc

        logger.info("service disabled and uninstalled service")

    def _uninstall_service_macos(self):
        try:
            # launchctl unload -w stops and disables
            subprocess.run(["launchctl", "unload", "-w", str(PHOTOBOOTH_APP_PLIST_FILE)], check=True)
        except Exception as exc:
            # might already be unloaded
            logger.warning(f"error unloading service: {exc}")

        try:
            os.remove(PHOTOBOOTH_APP_PLIST_FILE)
        except Exception as exc:
            raise RuntimeError("could not delete service file") from exc

        logger.info("service disabled and uninstalled service")
