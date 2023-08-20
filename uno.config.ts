import { defineConfig, presetUno } from "unocss";
import variantGroup from "@unocss/transformer-variant-group";
import directives from "@unocss/transformer-directives";
import presetIcons from "@unocss/preset-icons";
import extractorSvelte from "@unocss/extractor-svelte";

export default defineConfig({
    presets: [
        presetUno(),
        presetIcons({
            cdn: "https://cdn.skypack.dev/",
            warn: true,
            extraProperties: {
                display: "block",
                width: "100%",
                height: "100%",
                "z-index": "0",
                "aspect-ratio": "1/1",
            },
        }) as any,
    ],
    transformers: [
        variantGroup(),
        directives()
    ],
    extractors: [extractorSvelte()],
    theme: {
        fontFamily: {
            unbounded: "'Unbounded', sans-serif",
        },
        boxShadow: {
            "nb-sm": "var(--un-shadow-inset) 0.125rem 0.125rem 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 0.25));",
            "nb": "var(--un-shadow-inset) 0.25rem 0.25rem 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 0.25));",
            "nb-lg": "var(--un-shadow-inset) 0.5rem 0.5rem 0px 0px var(--un-shadow-color, rgba(0, 0, 0, 0.25));",
        },
    },
    shortcuts: {
        "clip-message": "[clip-path:polygon(0%_0%,_100%_0%,_100%_75%,_75%_75%,_75%_100%,_50%_75%,_0%_75%)]"
    }
});
