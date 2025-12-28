from jinja2 import Environment, FileSystemLoader
from pathlib import Path
import shutil


def recurse_dir(paths, dir, depth, ignore, ext):
    if depth > 20:
        print("directory structure too deep!")

    for child in dir.iterdir():
        if child.is_dir() and child.name != ignore:
            recurse_dir(paths, child, depth + 1, ignore, ext)

        if child.suffix == ext:
            paths.append(child)

    return 


def replace_root_dir_and_ext(path, src_root, dist_root, dist_ext):
    try:
        rel = path.relative_to(src_root)
    except Exception:
        # path is not under old_root — return unchanged or raise if you prefer
        return path

    dist_path = dist_root.joinpath(rel)
    return dist_path.with_suffix(dist_ext)


def build():
    print("rendering templates...")

    src_dir = Path("./src")
    dist_dir = Path("./dist")
    static_dir = Path("./static")

    env = Environment(loader=FileSystemLoader(str(src_dir)), autoescape=True)

    j2_paths = []
    recurse_dir(j2_paths, src_dir, 0, "templates", ".j2")

    html_paths = []
    for j2_path in j2_paths:
        html_paths.append(replace_root_dir_and_ext(j2_path, src_dir, dist_dir, ".html"))

    for j2_path, html_path in zip(j2_paths, html_paths):
        template = env.get_template(str(j2_path.relative_to(src_dir)))
        html = template.render()
        html_path.parents[0].mkdir(parents=True, exist_ok=True)
        html_path.write_text(html, encoding="utf-8")
    
    shutil.copytree(static_dir, dist_dir, dirs_exist_ok=True)

    print("done!")

    return


if __name__ == "__main__":
    build()

