import clientPromise from "@/lib/mongo";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const shortUrl = (await params).url;
  console.log("this is slug: ", shortUrl);
  

  const client = await clientPromise;
  const db = client.db("bitlinks");
  const collection = db.collection("url");

  const doc = await collection.findOne({ shortUrl: shortUrl });

  console.log("THIS IS REDIRECT PAGE: ", doc);

  if (doc) {
    redirect(doc.url);
  } else {
    redirect(`${process.env.NEXT_PUBLIC_HOST}`);
  }
  return <div>My Post: {url}</div>;
}
