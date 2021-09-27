import coinAnimation from "./coin.json";

export const coin = (text: string) => {
  const draft = {...coinAnimation};

  if (draft.layers[0].t?.d.k[0].s.t) {
    draft.layers[0].t.d.k[0].s.t = text;
  }

  return draft;
}
