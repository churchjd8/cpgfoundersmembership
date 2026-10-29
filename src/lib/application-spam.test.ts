import { test } from "node:test";
import assert from "node:assert/strict";
import { HONEYPOT_FIELD, looksRandom, screenApplication } from "./application-spam";

const NOW = 1_800_000_000_000;
const started = NOW - 90_000;

const megan = {
  firstName: "Megan",
  lastName: "Campbell",
  email: "megan@montanyadistillers.com",
  business: "Montanya Distillers",
  challenge:
    "Fundraising. Boot strapped the business. Now Raising our seed raise and raising from a position of little run way… how do you sell that it’s hard",
  breakthrough: "Securing 50% of our seed round ($500K) so we can capitalize on the momentum we have",
  referral: "LinkedIn",
  startedAt: started,
};

test("real applications pass", () => {
  assert.deepEqual(screenApplication(megan, NOW), { kind: "ok" });
  assert.deepEqual(
    screenApplication(
      {
        firstName: "Brett",
        lastName: "Hobbs",
        email: "brett@dancewater.com",
        business: "DANCE WATER  ",
        challenge: "Retail Expansion",
        breakthrough: "Sprouts PO, DSD in SoCal",
        referral: "Linkedin",
        startedAt: started,
      },
      NOW,
    ),
    { kind: "ok" },
  );
});

test("the Oct 28 gibberish submission is flagged", () => {
  const verdict = screenApplication(
    {
      firstName: "Lggfmlh",
      lastName: "Eecxdidzc",
      email: "ucel.i.vu.hoge4.0@gmail.com",
      business: "Tvdycbrwqj LLC",
      challenge: "QWjrSBsmTopCPuDVxze",
      breakthrough: "Iezwomqvs LLC",
      referral: "GBqYdehVoCZPNWwKlNXdb",
      startedAt: started,
    },
    NOW,
  );
  assert.equal(verdict.kind, "likely-spam");
});

test("honeypot and timing catch bots", () => {
  assert.equal(screenApplication({ ...megan, [HONEYPOT_FIELD]: "x" }, NOW).kind, "bot");
  assert.equal(screenApplication({ ...megan, startedAt: undefined }, NOW).kind, "bot");
  assert.equal(screenApplication({ ...megan, startedAt: NOW - 1500 }, NOW).kind, "bot");
});

test("one odd signal alone is not spam", () => {
  assert.equal(screenApplication({ ...megan, email: "m.e.g.an@gmail.com" }, NOW).kind, "ok");
});

test("looksRandom spares real words", () => {
  for (const w of ["strengths", "McDonald", "iPhone", "DANCE", "Schwartz", "KPMG", "LinkedIn"]) {
    assert.equal(looksRandom(w), false, w);
  }
  for (const w of ["Lggfmlh", "QWjrSBsmTopCPuDVxze", "GBqYdehVoCZPNWwKlNXdb", "Tvdycbrwqj"]) {
    assert.equal(looksRandom(w), true, w);
  }
});
