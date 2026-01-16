import logging

import pytest

from photobooth.appconfig import AppConfig, appconfig
from photobooth.database.database import create_db_and_tables

logger = logging.getLogger(name=None)


@pytest.fixture(scope="function", autouse=True)
def global_function_setup2():
    logger.info("global function-scoped appconfig reset and optimization for speed reasons")

    appconfig.reset_defaults()
    # Ensure action lists exist even if local config/config.json is missing or contains empty lists (CI/local repo)
    defaults = AppConfig().actions
    # If AppConfig reads an existing config file that has empty lists, fallback to static defaults
    if not defaults.animation:
        from photobooth.services.config.groups.actions import GroupActions

        defaults = GroupActions()

    if not appconfig.actions.image:
        appconfig.actions.image = defaults.image
    if not appconfig.actions.collage:
        appconfig.actions.collage = defaults.collage
    if not appconfig.actions.animation:
        appconfig.actions.animation = defaults.animation
    if not appconfig.actions.video:
        appconfig.actions.video = defaults.video
    if not appconfig.actions.multicamera:
        appconfig.actions.multicamera = defaults.multicamera

    appconfig.actions.image[0].jobcontrol.countdown_capture = 0.0
    appconfig.actions.collage[0].jobcontrol.countdown_capture = 0.0
    appconfig.actions.collage[0].jobcontrol.countdown_capture_second_following = 0.0
    appconfig.actions.collage[0].jobcontrol.approve_autoconfirm_timeout = 0.0
    appconfig.actions.animation[0].jobcontrol.countdown_capture = 0.0
    appconfig.actions.animation[0].jobcontrol.countdown_capture_second_following = 0.0
    appconfig.actions.animation[0].jobcontrol.approve_autoconfirm_timeout = 0.0
    appconfig.actions.video[0].jobcontrol.countdown_capture = 0.0
    appconfig.actions.multicamera[0].jobcontrol.countdown_capture = 0.0

    yield


@pytest.fixture(scope="session", autouse=True)
def session_setup1():
    create_db_and_tables()

    yield
