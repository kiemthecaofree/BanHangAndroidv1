const getYoutubeHTML = async () => {
  const result = await fetch("http://localhost:9000/youtube-html").then(
    (response) => response.json()
  );
  if (result.status) {
    console.log(result.data);
    let div = document.createElement("div");
    let video_tieu_de = ""
    let text = "";
    result.data.forEach((video, index) => {
      if (index === result.data.length - 1) {
        text += `'${video.authorDisplayName}'`;
      } else {
        text += `'${video.authorDisplayName}'` + ", ";
      }
    })
    console.log(text);
    console.log(result.data[0].textDisplay.slice(0, 100));
  } else {
    console.log("URL 404");
  }
};

getYoutubeHTML();
