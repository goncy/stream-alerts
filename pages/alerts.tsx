import Lottie from "lottie-web";
import {useEffect, useRef, useState} from "react";
import tmi from "tmi.js";

import {coin} from "../animations";

const client = new tmi.Client({
  channels: ["goncypozzo"],
});

client.connect();

function Alerts(): JSX.Element {
  const alert = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    client.on("message", (_channel, tags, message) => {
      if (message === "!subscription") {
        setAnimationData(coin(`${tags.username} se subscribió`));
      } else if (message === "!follow") {
        setAnimationData(coin(`${tags.username} te siguió`));
      }
    });

    const animation = Lottie.loadAnimation({
      container: alert.current as unknown as Element,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData,
    });

    return () => {
      animation.destroy();
    };
  }, [animationData]);

  useEffect(() => {
    if (animationData) {
      setTimeout(() => setAnimationData(null), 3000);
    }
  }, [animationData]);

  return <section ref={alert} id="alert" style={{height: "100%"}} />;
}

export default Alerts;
