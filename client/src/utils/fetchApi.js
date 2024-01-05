// const BASE_URL = "http://localhost:5000"; // Update the base URL to your server URL
const BASE_URL = "https://sahoo-blog-server.vercel.app";
export const request = async (
  url,
  method,
  headers = {},
  body = {},
  isNotStringified = false
) => {
  try {
    let options = {
      method,
      headers: {
        ...headers,
      },
    };

    if (method !== "GET") {
      options.headers["Content-Type"] = "application/json";

      if (!isNotStringified) {
        options.body = JSON.stringify(body);
      } else {
        options.body = body;
      }
    }

    const response = await fetch(BASE_URL + url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// // const BASE_URL = "https://sahoo-blog-server.vercel.app";
// const BASE_URL = "http://localhost:5000";

// export const request = async (
//   url,
//   method,
//   headers = {},
//   body = {},
//   isNotStringified = false
// ) => {
//   let res;
//   let data;
//   switch (method) {
//     case "GET":
//       res = await fetch(BASE_URL + url, { headers });
//       data = await res.json();
//       return data;

//     case "POST":
//       // if we send form data, it is not content-type:application/json,
//       // hence the bonus param
//       if (isNotStringified) {
//         res = await fetch(BASE_URL + url, { headers, method, body });

//         data = await res.json();
//       } else {
//         res = await fetch(BASE_URL + url, {
//           headers,
//           method,
//           body: JSON.stringify({ ...body }),
//         });
//         console.log(res);
//         data = await res.json();
//       }
//       return data;

//     case "PUT":
//       res = await fetch(BASE_URL + url, {
//         headers,
//         method,
//         body: JSON.stringify({ ...body }),
//       });
//       data = await res.json();
//       return data;

//     case "DELETE":
//       res = await fetch(BASE_URL + url, { headers, method });
//       data = await res.json();
//       return data;
//     default:
//       return;
//   }
// };
