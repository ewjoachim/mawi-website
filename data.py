#!/usr/bin/env python
import pathlib

import yaml

exclude = {pathlib.Path("content/admin/config.yml")}


def main():
    static_raw = pathlib.Path("combine_static.yml").read_text()
    data = yaml.safe_load(static_raw)

    for key, value in get_all_data().items():
        data["variables"][key] = {"default": value}

    pathlib.Path("combine.yml").write_text(yaml.safe_dump(data))


def get_all_data():
    path = pathlib.Path("content")
    data = {}

    for subpath in sorted(path.glob("*.yml")):
        if subpath in exclude:
            continue

        file_data = extract_yml(path=subpath)
        name = str(subpath.stem.lstrip("_"))
        data[name] = file_data
        print(f"Copying {name} from {subpath}")

    data["testimonies"] = []
    for subpath in sorted((path / "testimonies").glob("*.yml")):
        if subpath in exclude:
            continue

        file_data = extract_yml(path=subpath)
        data["testimonies"].append(file_data)
        print(f"Testimonies: Copying {subpath.stem} from {subpath}")

    return data


def extract_yml(path):
    return yaml.safe_load(path.read_text())


if __name__ == "__main__":
    main()
