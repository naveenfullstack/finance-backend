const ReqDomain = (req, res, next) => {
  // Define ANSI escape codes for green text color
  const greenColor = "\x1b[32m";
  const resetColor = "\x1b[0m";

  // Extract the domain from the 'referer' header of the request
  const referer = req.get("referer");

  // Parse the referer URL to get the domain
  const domain = referer ? new URL(referer).hostname : "Unknown Domain";

  // Get the current date and time
  const now = new Date();
  const formattedDate = `${now.getFullYear()} ${now.toLocaleString("default", {
    month: "short",
  })} ${now.getDate()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${
    now.getHours() >= 12 ? "PM" : "AM"
  }`;

  // Log the domain, request time, and requested URL to the console
  console.log(
    `${greenColor}${domain} ${resetColor}has requested at ${formattedDate} URL: ${greenColor}${req.originalUrl}`
  );

  // Continue processing the request
  next();
};
module.exports = ReqDomain;
