import pdfplumber

rawtext = ""
with open("fulltext.txt", "w", encoding="utf-8") as f:
  with pdfplumber.open("./Draw Steel RC for Patrons.pdf") as pdf:
    pageNum = 1
    for p in pdf.pages:
      print("Extracting page " + str(pageNum))
      rawtext += p.dedupe_chars().extract_text()
      pageNum+=1
    pdf.close()
  f.write(rawtext)
  f.close()
