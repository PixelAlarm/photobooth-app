from pathlib import Path

from .groups.actions import AnimationProcessing, CollageProcessing, GroupActions, SingleImageProcessing


def _wanted_paths(processing) -> list[tuple[str, Path | None]]:
    """(config field, path) the processing config actually uses; files of disabled steps are ignored."""
    paths: list[tuple[str, Path | None]] = []

    if isinstance(processing, SingleImageProcessing):
        if processing.img_background_enable:
            paths.append(("img_background_file", processing.img_background_file))
        if processing.img_frame.enable:
            paths.append(("img_frame.image", processing.img_frame.image))
        if processing.texts_enable:
            paths += [("texts.font", text.font) for text in processing.texts]

    elif isinstance(processing, CollageProcessing):
        if processing.capture_img_background_enable:
            paths.append(("capture_img_background_file", processing.capture_img_background_file))
        if processing.canvas_img_background_enable:
            paths.append(("canvas_img_background_file", processing.canvas_img_background_file))
        if processing.canvas_img_front_enable:
            paths.append(("canvas_img_front_file", processing.canvas_img_front_file))
        if processing.canvas_texts_enable:
            paths += [("canvas_texts.font", text.font) for text in processing.canvas_texts]
        paths += [("merge_definition.predefined_image", item.predefined_image) for item in processing.merge_definition]

    elif isinstance(processing, AnimationProcessing):
        paths += [("merge_definition.predefined_image", item.predefined_image) for item in processing.merge_definition]

    return paths


def find_missing_files(processing) -> list[tuple[str, Path]]:
    """(config field, path) of configured files of enabled steps that do not exist (anymore)."""
    return sorted({(field, path) for field, path in _wanted_paths(processing) if path and not path.is_file()}, key=lambda m: (m[1], m[0]))


def find_all_missing_files(actions: GroupActions) -> list[dict[str, str | int]]:
    """Missing files of all actions with their location in the config."""
    return [
        {"action": action_type, "index": index, "field": field, "path": str(path)}
        for action_type in ("image", "collage", "animation", "video", "multicamera")
        for index, cs in enumerate(getattr(actions, action_type))
        for field, path in find_missing_files(cs.processing)
    ]
