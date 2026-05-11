import pathlib
tex = pathlib.Path('/home/besp/Desktop/bookstore-main/thesis_assets/thesis.tex')
ch4 = open('/home/besp/Desktop/bookstore-main/thesis_assets/ch4_content.txt', encoding='utf-8').read()
with open(tex, 'a', encoding='utf-8') as f:
    f.write(ch4)
print('done, lines:', len(tex.read_text(encoding='utf-8').splitlines()))
