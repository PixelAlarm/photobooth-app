import json
from pathlib import Path
from unittest.mock import MagicMock

import pytest

from photobooth.appconfig import appconfig
from photobooth.services.config.appconfig_ import AppConfig
from photobooth.services.config.groups.actions import CollageProcessing, SingleImageProcessing
from photobooth.services.config.missingfiles import find_all_missing_files, find_missing_files
from photobooth.services.config.models.frameoverlay import FrameOverlay
from photobooth.services.config.models.models import CollageMergeDefinition
from photobooth.services.processing import ProcessingService


def test_config_loads_with_missing_file_and_reports_it(tmp_path: Path):
    missing = tmp_path / "gone.png"
    processing = SingleImageProcessing(img_frame=FrameOverlay(enable=True, image=missing))

    assert find_missing_files(processing) == [("img_frame.image", missing)]


def test_existing_file_not_reported(tmp_path: Path):
    existing = tmp_path / "frame.png"
    existing.touch()

    assert find_missing_files(SingleImageProcessing(img_frame=FrameOverlay(enable=True, image=existing))) == []


def test_disabled_step_is_ignored(tmp_path: Path):
    processing = SingleImageProcessing(img_frame=FrameOverlay(enable=False, image=tmp_path / "gone.png"))

    assert find_missing_files(processing) == []


def test_collage_predefined_image(tmp_path: Path):
    processing = CollageProcessing(merge_definition=[CollageMergeDefinition(predefined_image=tmp_path / "gone.png")])

    assert find_missing_files(processing) == [("merge_definition.predefined_image", tmp_path / "gone.png")]


def test_appconfig_loads_with_missing_file(tmp_path: Path):
    data = AppConfig().model_dump(mode="json")
    data["actions"]["image"][0]["processing"]["img_frame"] = {"enable": True, "image": str(tmp_path / "gone.png")}

    config = AppConfig.model_validate(data)

    assert {"action": "image", "index": 0, "field": "img_frame.image", "path": str(tmp_path / "gone.png")} in find_all_missing_files(config.actions)


def test_startup_logs_missing_files(tmp_path: Path, caplog: pytest.LogCaptureFixture):
    appconfig.actions.image[0].processing.img_frame = FrameOverlay(enable=True, image=tmp_path / "gone.png")

    ProcessingService(MagicMock(), MagicMock(), MagicMock()).start()

    assert str(tmp_path / "gone.png") in caplog.text


def test_file_fields_keep_file_path_schema_format():
    image = FrameOverlay.model_json_schema()["properties"]["image"]

    assert image["anyOf"][0] == {"format": "file-path", "type": "string"}
    assert image["list_api"] == "/api/admin/enumerate/userfiles"
    assert '"format": "path"' not in json.dumps(AppConfig.model_json_schema())


def test_empty_file_field_means_no_file():
    processing = CollageProcessing(merge_definition=[CollageMergeDefinition(predefined_image="")])

    assert processing.merge_definition[0].predefined_image is None
    assert find_missing_files(processing) == []
