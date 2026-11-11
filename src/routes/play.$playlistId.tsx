import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BootScreen, LoginPanel } from "@/components/shell";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getScreenFn } from "@/lib/saban/api";
import { statusLabel } from "@/lib/saban/compose";
import type { Product, SignageScreen } from "@/lib/saban/types";
import { messageOf } from "@/components/kit";

export const Route = createFileRoute("/play/$playlistId")({
  component: PlayGate,
});

function PlayGate() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) return <BootScreen />;
  if (!user) return <LoginPanel />;
  return <Player />;
}

function Player() {
  const { playlistId } = Route.useParams();
  const [screen, setScreen] = useState<SignageScreen | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState("");
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let live = true;
    getScreenFn({ data: { id: playlistId } })
      .then((result) => {
        if (!live) return;
        setScreen(result.screen);
        setProducts(result.products);
      })
      .catch((err: unknown) => {
        if (live) setError(messageOf(err));
      });
    return () => {
      live = false;
    };
  }, [playlistId]);

  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    if (!screen || products.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % products.length);
    }, screen.intervalSec * 1000);
    return () => window.clearInterval(timer);
  }, [screen, products.length]);

  const product = products[index];
  const dark = screen?.screenType === "parking";

  return (
    <main className="grid min-h-screen place-items-center bg-ink text-primary-fg">
      <div
        className="relative overflow-hidden"
        style={{ width: 1920 * scale, height: 1080 * scale }}
      >
        <div
          className={`absolute top-0 right-0 origin-top-right ${dark ? "bg-primary text-primary-fg" : "bg-paper text-ink"}`}
          style={{ width: 1920, height: 1080, transform: `scale(${scale})` }}
        >
          {!product || !screen ? (
            <div className="grid h-full place-items-center text-3xl">{error || "טוען מסך…"}</div>
          ) : (
            <article
              key={product.productId}
              className={`grid h-full grid-cols-2 gap-16 p-20 ${screen.transition === "slide" ? "animate-[signage-slide_600ms_ease]" : "animate-[signage-fade_600ms_ease]"}`}
            >
              <div className="flex flex-col justify-center">
                {screen.screenType === "lobby" ? <p className="text-2xl text-accent">ח. סבן חומרי בניין · 1994</p> : null}
                {screen.screenType === "parking" ? <p className="text-2xl text-accent">סבן · חניון</p> : null}
                <p className="mt-4 text-3xl text-accent">{product.category || "חומר בנייה"}</p>
                <h1 className="mt-4 text-7xl leading-tight font-semibold">{product.nameHe}</h1>
                <p className="mt-8 max-w-3xl text-4xl leading-snug">
                  {product.marketingBenefits.split("\n").find(Boolean) || "שאלו את הצוות בסניף"}
                </p>
                {product.technicalStatus !== "VERIFIED" ? (
                  <p className="mt-8 text-2xl text-warn">פרטים טכניים רק לפי גיליון היצרן · {statusLabel(product.technicalStatus)}</p>
                ) : null}
                {product.priceApproved && product.priceText ? <p className="mt-8 text-4xl">{product.priceText}</p> : null}
                {product.promoText && product.priceApproved ? <p className="mt-3 text-2xl">{product.promoText}</p> : null}
              </div>
              <div className={`grid place-items-center rounded-3xl ${dark ? "bg-white/10" : "bg-surface"}`}>
                {product.productImageUrl ? (
                  <img src={product.productImageUrl} alt="" className="max-h-[70%] max-w-[80%] object-contain" />
                ) : (
                  <span className="text-9xl font-semibold text-primary/20">{product.nameHe.slice(0, 1)}</span>
                )}
              </div>
            </article>
          )}
        </div>
      </div>
      <style>{`@keyframes signage-fade{from{opacity:0}to{opacity:1}}@keyframes signage-slide{from{transform:translateX(-24px);opacity:.4}to{transform:none;opacity:1}}`}</style>
    </main>
  );
}
