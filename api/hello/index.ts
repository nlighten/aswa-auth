import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("HTTP trigger function processed a request.");

  const header = req.headers["x-ms-client-principal"];
  if (header) {
    const encoded = Buffer.from(header, "base64");
    const decoded = encoded.toString("ascii");
    const clientPrincipal = JSON.parse(decoded);

    context.res = {
      body: `Thanks for logging in ${
        clientPrincipal.userDetails
      }. You logged in via ${
        clientPrincipal.identityProvider
      } and have the roles ${clientPrincipal.userRoles.join(", ")}`,
    };
  } else {
    context.res = {
      body: "You are not logged in at the moment",
    };  
  }
};

export default httpTrigger;
