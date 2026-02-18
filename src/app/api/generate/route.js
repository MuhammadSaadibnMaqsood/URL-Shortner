import clientPromise from "@/lib/mongo";
export async function POST(request) {
  const body = await request.json();

  const client = await clientPromise;
  const db = client.db("bitlinks");
  const collection = db.collection("url");

  const doc = await collection.findOne({ shortUrl: body.shortUrl });

  if (doc) {
    return Response.json({
      message: "URL already exist",
      success: false,
      error: true,
    });
  }

  console.log(doc);

  const result = await collection.insertOne({
    url: body.url,
    shortUrl: body.shortUrl,
  });

  return Response.json({
    message: "URL generated",
    success: true,
    error: false,
  });
}
