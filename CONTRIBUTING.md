# Közreműködés a Műegyetemi Versenycsapat Közösség weboldalának esetében

> Közreműködés előtt kéretik elolvasni a [közreműködők magatartási kódexét](CODE_OF_CONDUCT.md).

## Tartalomkezelés

Új tartalom hozzáadásához szükséges egy `.md` kiterjesztésű Markdown fájl létrehozása az `src/pages` könyvtár megfelelő útvonalán. Az újonnan létrehozott oldalak metaadatai egy úgynevezett [front matter][] szekcióban tárolandók. Jelenleg az alábbi metaadatok támogatottak:

- `title`: A bejegyzés címe.
- `date`: A bejegyzés közzétételének dátuma [ISO 8601][] formátumban megadva.
- `draft`: Logikai érték, `true` esetén a bejegyzés nem jelenik meg a weboldalon. Alapértelmezés szerint `false`.
- `image`: A bejegyzéshez tartozó borítókép.
- `team`: A bejegyzéshez kapcsolódó csapat neve.

[Front matter]: https://jekyllrb.com/docs/frontmatter
[ISO 8601]: https://wikipedia.org/wiki/ISO_8601

A Markdown támogatja a HTML tageket is, így akár videók vagy egyéb beágyazható elemek is megjeleníthetők a bejegyzésekben.

A weboldal tartalmának szerkesztése közben érdemes nyomon követni a változásokat a [fejlesztői mód](#fejlesztoi-mod) segítségével.

## Fejlesztés

A weboldal funkcionalitásának bővítéséhez szükséges lehet a JavaScript, a [React][], valamint a [GraphQL][] ismerete. Továbbá érdemes követni a weboldal generálásáért felelős [Gatsby][] projekt konvencióit.

[Gatsby]: https://gatsbyjs.org
[GraphQL]: http://graphql.org
[React]: https://facebook.github.io/react

### Fejlesztői mód

A `yarn develop` parancs kiadásával a projekt fejlesztői módban szolgálható ki a helyi számítógépen. A weboldal tartalmát érintő fájlok módosításakor a szerver megpróbálja automatikusan frissíteni a megváltoztatott elemeket.

### Konvenciók

A projektben használatos kódolási konvenciók betartatásának érdekében linter, a kódolási stílus egységesítésének érdekében pedig automatikus kód formázó használatos.

- `yarn lint`: Ellenőrzi a kódolási konvenciók betartását.
- `yarn format`: Automatikusan formázza a kódot, valamint megpróbálja kijavítani a lintelés során felmerülő problémákat.
