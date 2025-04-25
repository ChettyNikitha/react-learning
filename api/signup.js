const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const client = new CosmosClient({ endpoint, key });

const databaseId = "peersonalbudgetplanning"; // Update this to your DB name
const containerId = "Users";           // Update this if different

module.exports = async function (context, req) {
    const { email, password } = req.body;

    if (!email || !password) {
        context.res = {
            status: 400,
            body: "Email and password are required.",
        };
        return;
    }

    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: containerId });

    try {
        await container.items.create({
            id: email,
            email,
            password, // ⚠️ Hash this before saving in production
        });

        context.res = {
            status: 200,
            body: `User ${email} added.`,
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: `Error saving user: ${err.message}`,
        };
    }
};
