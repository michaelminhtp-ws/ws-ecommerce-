IntelHirePro PL - Poland-ready frontend

Based on the supplied Intelhireprohp project.

Changed:
- All visible Germany/German website text -> natural Polish
- Country badge -> Polska
- Application form default phone country -> Polska +48
- Country names in phone selector -> Polish
- Metadata -> HirePro Polska
- html language -> pl
- OpenGraph locale -> pl_PL
- Existing EUR salary figures -> rounded PLN equivalents
- Lead proxy origin cleaned to https://www.intelhirepropl.com

Preserved:
- Existing dark/yellow theme
- Confirmation-before-Telegram workflow
- Existing Meta Pixel event logic
- Existing bot fallback username applyyourjobhere_bot
- Existing API proxy architecture
- Existing age requirement: 18

Note:
The PLN amounts are rounded equivalents intended to preserve roughly the same value as the existing EUR figures. They are not a market-salary validation.
