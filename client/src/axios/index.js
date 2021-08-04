const devURL = "http://localhost:3001/";

const proURL = "https://image-0upload.herokuapp.com/";

const base_url = process.env.NODE_ENV === "production" ? proURL : devURL;

export default base_url;