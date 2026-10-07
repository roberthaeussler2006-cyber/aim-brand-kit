# Components

All classes come from `brand/components.css`. Copy these snippets; do not restyle them with new
colours or fonts. Sizes are in `em`, relative to the canvas `--base`, so they work in every format.

## Page skeleton

```html
<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="aim:size" content="1080x1350">          <!-- or <meta name="aim:print" content="A3"> -->
<title>...</title>
<link rel="stylesheet" href="../../brand/tokens.css">
<link rel="stylesheet" href="../../brand/components.css">
<style>
  .canvas { --w: 1080px; --h: 1350px; --base: 30px; --pad-x: 80px; --pad-top: 80px; --pad-bottom: 76px; }
  /* design-specific layout only: spacing, grid, positions. Colours and fonts via tokens. */
</style>
</head>
<body>
<div class="canvas theme-dark">        <!-- theme-dark | theme-light | theme-violet -->
  <!-- background layers first -->
  <div class="grain"></div>
  <div class="content">
    <!-- logo, text, blocks -->
  </div>
</div>
</body>
</html>
```

Several `.canvas` blocks in one file = carousel slides, deck slides or document pages.

## Background layers (inside `.canvas`, before `.content`)

```html
<div class="glow" style="--x: 50%; --y: 35%; --size: 170%"></div>          <!-- purple glow; .glow--soft is subtler -->
<img class="dome" src="../../brand/motifs/network-dome.svg" alt="" style="--x: 50%; --y: 35%; --size: 120%; --opacity: .6">
<div class="photo"><img src="../../brand/photos/mountains.jpg" alt="" style="--focus: 50% 35%"></div>
<div class="photo photo--top" style="--photo-h: 55%"><img src="../../brand/photos/dark-peak.jpg" alt=""></div>
<div class="vignette"></div>                                                 <!-- darkens edges for readability -->
<img src="../../brand/motifs/climb-mountain-route.svg" alt="" data-decor style="position:absolute; left:0; bottom:0; width:100%; z-index:0"> <!-- light designs: Learning Journey climb -->
<div class="grain"></div>                                                    <!-- always last background layer -->
```

Use either a photo or glow + dome as the main background, not both at full strength.
Light designs: use `network-dome-light.svg`, no vignette.

## Logo

```html
<img class="logo" src="../../brand/logo/aim-wordmark-light.svg" alt="AIM, AI in Management Club" style="--logo-w: 6em">
<img class="logo" src="../../brand/logo/aim-mark-dark.svg" alt="AIM" style="--logo-w: 3em">
```

## Text

```html
<div class="eyebrow">Herbstsemester 26</div>
<div class="eyebrow eyebrow--dash">Learning Journey · Session 1</div>

<h1 class="headline headline--hero">Kickoff<br>mit <span class="hl">PwC</span></h1>   <!-- biggest, 1 to 3 words per line -->
<h1 class="headline">Prompting für <span class="hl">Pitch-Decks.</span></h1>
<h2 class="headline headline--md">...</h2>
<h3 class="headline headline--sm">...</h3>
<!-- fine-tune size with style="--headline-size: 3.4em" -->

<p class="lede">One or two sentences that explain the headline.</p>
<p class="text"><b>Keynote: Name</b>, role at company.</p>
<p class="small">Eintritt frei. Offen für alle.</p>
```

Keep words together with `&nbsp;` (`St.&nbsp;Gallen`, `CHF&nbsp;40`) or `<span class="nowrap">aim-club.ch/join</span>`.

## Facts (date, time, place)

```html
<dl class="facts">
  <div><dt>Datum</dt><dd>Mittwoch, 23. September</dd></div>
  <div><dt>Zeit</dt><dd>16.00 bis 17.30 Uhr</dd></div>
  <div><dt>Ort</dt><dd>SQUARE, HSG<small>Räume Vadian &amp; Gallus</small></dd></div>
</dl>
```

## Big date

```html
<div class="date"><div class="date__num">23</div><div class="date__mo">September<span>16.00 bis 17.30 Uhr</span></div></div>
```

## Numbered list

```html
<ol class="numbered">
  <li><span class="n">01</span><div><h3>Title</h3><p>One line of explanation.</p></div></li>
</ol>
```

## Buttons, badges, call to action

```html
<div class="cta">
  <div class="pill">Jetzt anmelden <span class="pill__arrow">→</span></div>
  <div class="url">aim-club.ch/events</div>
</div>
<div class="pill pill--ghost">Mehr erfahren</div>
<div class="badge">Workshop</div>
```

Designs are images: a button is a visual cue, so always put the URL or a QR code next to it.

## Blocks

```html
<div class="rule"></div>                 <!-- full-width line -->
<div class="tick"></div>                 <!-- short purple accent bar -->
<div class="card">...</div>              <!-- square card; .card--tint for a soft purple surface on light -->
<div class="qr-block"><img class="qr" src="../../brand/qr/qr-join.svg" alt="QR-Code"><div>...</div></div>
<div class="footer-bar"><span>aim-club.ch</span><span>@aiinmanagement</span></div>
<div class="ticker"><span>Workshops</span><i>◆</i><span>Fireside Chats</span><i>◆</i><span>Panels</span></div>
<img class="portrait" src="../../brand/photos/team/board-4x5/simon-seidl.jpg" alt="Simon Seidl">
```

## Icons

```html
<img class="icon" src="../../brand/icons/chip.svg" alt="" style="--icon-w: 2em">
```

The render script swaps each `img.icon` for the inline SVG, so the icon takes the accent colour
(`--accent`, or set `color:` on it). In a plain browser preview icons look black until rendered.
Names and German labels: `brand/icons/icons.json`. Use icons in rows of the same size, never as decoration confetti.

## Layout helpers

`.push` pushes the next element to the bottom of `.content`. `.center` centres the content column.
