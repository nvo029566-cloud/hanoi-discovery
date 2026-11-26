import { revalidateTag, updateTag } from "next/cache";
import { after } from "next/server";

/**
 * Expires the cached catalog after a content change. Server Actions only.
 *
 * `updateTag` makes the change visible to the very next request. A catalog rebuild that was already
 * running when the change was written can still finish afterwards and store the old data as fresh,
 * which would then be served until the cache profile expires. A second expiry shortly after the
 * response closes that window: any rebuild that started before the change has finished by then,
 * and every rebuild that starts after it reads the new data.
 */
export function expireCatalog(): void {
  updateTag("catalog");
  after(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    revalidateTag("catalog", { expire: 0 });
  });
}
