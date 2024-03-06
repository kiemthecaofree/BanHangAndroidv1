const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const corsOptions = {
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));

const getAllComment = async (videoId, pageToken) => {
  const { data } = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=AIzaSyB_52wjxGyXi0elTQGkhfcptFVcBTEDReI&maxResults=500&pageToken=${pageToken}`
  );
  return data;
};

const addCommentToList = async (list, videoId, pageToken) => {
  const result = await getAllComment(videoId, pageToken);
  result.items.map((video, index) => {
    list.push({
      index: list.length + 1,
      textDisplay: video.snippet.topLevelComment.snippet.textDisplay,
      authorDisplayName:
        video.snippet.topLevelComment.snippet.authorDisplayName,
      authorProfileImageUrl:
        video.snippet.topLevelComment.snippet.authorProfileImageUrl,
      authorChannelUrl: video.snippet.topLevelComment.snippet.authorChannelUrl,
      updatedAt: video.snippet.topLevelComment.snippet.updatedAt,
    });
  });
  return {
    list: list,
    nextPageToken: result.nextPageToken,
  };
};

app.get("/youtube-html", async (req, res) => {
  const videoId = "-7vfARF6eTI";
  let list = [];
  const result = await addCommentToList(list, videoId, "");
  list = result.list;

  if (result.nextPageToken) {
    const result_one = await addCommentToList(
      list,
      videoId,
      result.nextPageToken
    );
    list = result_one.list;
    if (result_one.nextPageToken) {
      const result_two = await addCommentToList(
        list,
        videoId,
        result_one.nextPageToken
      );
      list = result_two.list;
      if (result_two.nextPageToken) {
        const result_three = await addCommentToList(
          list,
          videoId,
          result_two.nextPageToken
        );
        list = result_three.list;
      }
    }
  }
  return res.status(200).send({
    status: true,
    data: list,
  });
});

app.listen(9000, async () => {
  console.log("RUN SERVER 9000");
});
