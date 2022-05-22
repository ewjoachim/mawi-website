#!/usr/bin/env python
import pathlib

import yaml
import json

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
        name = file_data["name"]
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
    data = yaml.safe_load(path.read_text())
    name = str(path.stem.lstrip("_"))

    print(f"{name}:")
    for params, i18n in [(data, False), (data.get("fr", {}), True)]:
        print(
            yaml.safe_dump(
                [{"i18n": i18n, "param": param, "type": "markdown"} for param in params]
            )
        )
    data["name"] = name
    return data


if __name__ == "__main__":
    main()
