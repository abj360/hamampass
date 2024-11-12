import SinglePropertyPage from "@/components/pages/single-property";
import { getPropertyByTitle } from "@/actions/property";
import { NextRequest } from "next/server";
import { TProperty } from "@hamampass/db/types";

const SingleProperty = async ({ params }: any) => {
  let { title } = params;
  let gender = null;

  if (title.startsWith("0") || title.startsWith("1")) {
    gender = title.slice(0, 1);
    title = title.slice(1);
  }

  const req = new NextRequest(
    `${process.env.BASE_URL}/api/property/${title}?gender=${gender}`
  );
  const res = (await getPropertyByTitle(req)) as unknown as TProperty;

  if (!res) {
    return {
      notFound: true,
    };
  }

  return (
    <main>
      <SinglePropertyPage
        data={res}
        decode_title={decodeURI(title.replace(/-/g, " "))}
      />
    </main>
  );
};

export default SingleProperty;
