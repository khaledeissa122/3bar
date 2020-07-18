export const createKeywords = name => {
  const keywords = [];
  let curName = [];
  name.split("").forEach(letter => {
    curName += letter;
    keywords.push(curName);
  });
  return keywords;
};

export const geo = async () => {
  return await fetch("https://extreme-ip-lookup.com/json/")
   .then(res => res.json())
   .then(response => {
       return response;
     });
 }
