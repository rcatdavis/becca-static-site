# Deploying to internal GitHub Pages

Target: `https://github.internal.digitalocean.com/pages/rdavis/prototypes/`

> Note: the cloud agent that produced these files cannot reach
> `github.internal.digitalocean.com` (internal network), so the steps below must
> be run from a machine on the DO network / VPN that has access to the internal
> GitHub Enterprise host.

## Contents

```
prototypes/
  index.html                          # landing page  ->  /pages/rdavis/prototypes/
  billing-discount-clarity/
    index.html                        # prototype     ->  /pages/rdavis/prototypes/billing-discount-clarity/
    preview.png                       # static preview image
```

Everything is self-contained (inline CSS, no build step, no external dependencies).

## One-time: publish to the internal `rdavis/prototypes` repo

```bash
# 1. Clone the internal Pages repo (on VPN / DO network)
git clone https://github.internal.digitalocean.com/rdavis/prototypes.git
cd prototypes

# 2. Copy the files from this branch into it.
#    (Grab them from the staging branch in becca-static-site, or download the
#     prototypes/ folder, then:)
cp -R /path/to/prototypes/* .

# 3. Commit & push
git add index.html billing-discount-clarity
git commit -m "Add billing discount-clarity prototype"
git push origin main
```

## Enable Pages (if not already on)

In the internal repo: **Settings -> Pages -> Source: `main` / root**, then save.
The site publishes at `https://github.internal.digitalocean.com/pages/rdavis/prototypes/`.

## Updating the prototype later

Edit `billing-discount-clarity/index.html` and push. To refresh `preview.png`:

```bash
google-chrome --headless --disable-gpu --no-sandbox --disable-dev-shm-usage \
  --force-device-scale-factor=2 --window-size=940,1265 \
  --screenshot=billing-discount-clarity/preview.png \
  "file://$PWD/billing-discount-clarity/index.html"
```
