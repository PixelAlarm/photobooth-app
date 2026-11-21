from pathlib import Path

from .groups.actions import AnimationProcessing, CollageProcessing, GroupActions, SingleImageProcessing


def _wanted_paths(processing) -> list[Path | None]:
    """Paths the processing config actually uses; files of disabled steps are ignored."""
    paths: list[Path | None] = []

    if isinstance(processing, SingleImageProcessing):
        if processing.img_background_enable:
            paths.append(processing.img_background_file)
        if processing.img_frame.enable:
            paths.append(processing.img_frame.image)
        if processing.texts_enable:
            paths += [text.font for text in processing.texts]

    elif isinstance(processing, CollageProcessing):
        if processing.capture_img_background_enable:
            paths.append(processing.capture_img_background_file)
        if processing.canvas_img_background_enable:
            paths.append(processing.canvas_img_background_file)
        if processing.canvas_img_front_enable:
            paths.append(processing.canvas_img_front_file)
        if processing.canvas_texts_enable:
            paths += [text.font for text in processing.canvas_texts]
        paths += [item.predefined_image for item in processing.merge_definition]

    elif isinstance(processing, AnimationProcessing):
        paths += [item.predefined_image for item in processing.merge_definition]

    return paths


def find_missing_files(processing) -> list[Path]:
    """Configured files of enabled steps that do not exist (anymore)."""
    return sorted({path for path in _wanted_paths(processing) if path and not path.is_file()})


def find_all_missing_files(actions: GroupActions) -> list[dict[str, str | int]]:
    """Missing files of all actions with their location in the config."""
    return [
        {"action": action_type, "index": index, "path": str(path)}
        for action_type in ("image", "collage", "animation", "video", "multicamera")
        for index, cs in enumerate(getattr(actions, action_type))
        for path in find_missing_files(cs.processing)
    ]
