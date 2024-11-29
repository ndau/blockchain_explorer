# Changelog

## [1.4.0-staging](https://github.com/ndau/blockchain-explorer/compare/v1.3.0-staging...v1.4.0-staging) (2023-03-16)


### Features

* add basic bookmark ([b38aa40](https://github.com/ndau/blockchain-explorer/commit/b38aa40cb31acd76c057119f2d1d490b04c429f2))
* add bookmark functionality ([c739f44](https://github.com/ndau/blockchain-explorer/commit/c739f442e0842590ef77158e1fc4487e87323a8e))
* add bookmark functionality ([4f5c54a](https://github.com/ndau/blockchain-explorer/commit/4f5c54ae2e47ddcfd927ad9607d1672fa542055d))
* add bookmark functionality ([1386e56](https://github.com/ndau/blockchain-explorer/commit/1386e5638d2775877e64f4f5961adc48279175ea))
* add front-end url ([dda2e8a](https://github.com/ndau/blockchain-explorer/commit/dda2e8a8fd1ebe7527dd5f19f980c1032fbd2c95))
* add icons to navbar ([df223d5](https://github.com/ndau/blockchain-explorer/commit/df223d5e6672b41962950f81c2ecd6fff3582c77))
* display "no transactions found for time period" ([4b89ca1](https://github.com/ndau/blockchain-explorer/commit/4b89ca19eafbce56c175b6bd5ed3366ae762e4ab))
* update version from staging to prod ([256e8bb](https://github.com/ndau/blockchain-explorer/commit/256e8bb2ceeb08d13c67c5cb06a136309c7800cf))


### Bug Fixes

* **account:** get change between last transaction and the one before it ([11e1608](https://github.com/ndau/blockchain-explorer/commit/11e16081532e07308a6cb5eb06fa5213a37f0683))
* **accounts:** fix display "no transactions found for time period" ([bbbdfb6](https://github.com/ndau/blockchain-explorer/commit/bbbdfb6f8440a79689fd6c040e73e397084d48ef))
* add links to icons ([387d7f3](https://github.com/ndau/blockchain-explorer/commit/387d7f3115e29377859e8f771440b6d43b94fd53))
* added ndau nodes endpoint ([8f4c6ac](https://github.com/ndau/blockchain-explorer/commit/8f4c6accca5fa465b6369ed01433b1b575d57649))
* disable blockchain menu in navbar ([099667b](https://github.com/ndau/blockchain-explorer/commit/099667b362c3a820abd24784378e1023ca8de61d))
* display correct message for no account acitivity in past month ([0a1c951](https://github.com/ndau/blockchain-explorer/commit/0a1c951d5f8494442f90ed8d00b12352a597c1dd))
* fix account transaction not filtering by type ([7e6b2f9](https://github.com/ndau/blockchain-explorer/commit/7e6b2f9b49ad9a6d1b6b09312ba08ca515f8db1c))
* fix format number of accounts ([387d7f3](https://github.com/ndau/blockchain-explorer/commit/387d7f3115e29377859e8f771440b6d43b94fd53))
* fix loading spinner not showing on filter ([7e6b2f9](https://github.com/ndau/blockchain-explorer/commit/7e6b2f9b49ad9a6d1b6b09312ba08ca515f8db1c))
* fix navbar logo not loading on transaction ([1ba2550](https://github.com/ndau/blockchain-explorer/commit/1ba2550250c6d2d6d44a7e23588f2fd1b9840b64))
* fix navbar width ([ce84bd7](https://github.com/ndau/blockchain-explorer/commit/ce84bd7ca204db5b17495e5317ee44a519d16cda))
* fix ndauNodes response ([455acd1](https://github.com/ndau/blockchain-explorer/commit/455acd130d5dd1ccd6bb5dc35dedd5f1da10bcc0))
* fix not found page for not existing accounts ([b44249d](https://github.com/ndau/blockchain-explorer/commit/b44249d0cdd1ee45c8941b54c12d18ab395e6048))
* fix open filtered transactions in new tab ([c0f7237](https://github.com/ndau/blockchain-explorer/commit/c0f7237b70410050d0b4e99708d8ad9e094682b0))
* fix richlist balance format ([387d7f3](https://github.com/ndau/blockchain-explorer/commit/387d7f3115e29377859e8f771440b6d43b94fd53))
* fix SERVICE_ENDPOINT to REACT_APP_SERVICE_ENDPOINT ([9a8e54b](https://github.com/ndau/blockchain-explorer/commit/9a8e54b8cc76a5806537fda3bf03130b0a9a1979))
* fix showing zero added for first entry in account ([c2aa384](https://github.com/ndau/blockchain-explorer/commit/c2aa3843a7d6af1467100e02b31162a0ece1c776))
* fix showing zero added for first entry in account ([99a9129](https://github.com/ndau/blockchain-explorer/commit/99a9129d734b848169bdc47d16af3b904b4758df))
* fix siteUrl ([73dd133](https://github.com/ndau/blockchain-explorer/commit/73dd133950042d3cafff55b17bcadefc2bf3c3dd))
* fix telegram and twitter links switched ([099667b](https://github.com/ndau/blockchain-explorer/commit/099667b362c3a820abd24784378e1023ca8de61d))
* fix timeline chart not being displayed ([11e1608](https://github.com/ndau/blockchain-explorer/commit/11e16081532e07308a6cb5eb06fa5213a37f0683))
* fix transactions filter stuck when no filters selected ([99378f3](https://github.com/ndau/blockchain-explorer/commit/99378f3ac4e97c84ce84415232d7745e7c7e5007))
* fixes in login functionality ([2a61349](https://github.com/ndau/blockchain-explorer/commit/2a61349d507746981122c55b71184eb60f1eb3f3))
* handle valid but empty for period accounts ([a18d808](https://github.com/ndau/blockchain-explorer/commit/a18d8088e59778d8465d670d6c224e7ac740be28))
* load basic information for valid but no transactions in period accounts ([1a1c515](https://github.com/ndau/blockchain-explorer/commit/1a1c515180399126719e74ba9708e0b9c4971a6a))
* reaplce lorem impsum on signup page ([099667b](https://github.com/ndau/blockchain-explorer/commit/099667b362c3a820abd24784378e1023ca8de61d))
* UI updates ([387d7f3](https://github.com/ndau/blockchain-explorer/commit/387d7f3115e29377859e8f771440b6d43b94fd53))
* update about us link and loginpage text ([1090ad5](https://github.com/ndau/blockchain-explorer/commit/1090ad538b56f53063b0c20d0c7d148092c0fa5d))


### Performance Improvements

* improve performance in login flow ([2a61349](https://github.com/ndau/blockchain-explorer/commit/2a61349d507746981122c55b71184eb60f1eb3f3))

## [1.3.0-staging](https://github.com/ndau/blockchain-explorer/compare/v1.2.0-staging...v1.3.0-staging) (2022-07-29)


### Features

* add user login/registration view ([ef2ed38](https://github.com/ndau/blockchain-explorer/commit/ef2ed387b55de3b8824cc9dc3813ec51fbb8870c))


### Bug Fixes

* fix getTransactionDetails for failing endpoints ([163cf57](https://github.com/ndau/blockchain-explorer/commit/163cf57e3490e5a6169e695fba401523789f184a))

## [1.2.0-staging](https://github.com/ndau/blockchain-explorer/compare/v1.1.1-staging...v1.2.0-staging) (2022-07-06)


### Features

* **account:** add pagination to transactions ([1aec9ef](https://github.com/ndau/blockchain-explorer/commit/1aec9ef2fdc6acc222d8d34ababaeeeb4c81c0a1))

## [1.1.1-staging](https://github.com/ndau/blockchain-explorer/compare/v1.1.0-staging...v1.1.1-staging) (2022-07-06)


### Bug Fixes

* **account:** load limited data when account opens ([83b0144](https://github.com/ndau/blockchain-explorer/commit/83b01446d544ab20519f9135cfb647f64d82fd34))
* **eai-rate:** fix eai-rate display ([83b0144](https://github.com/ndau/blockchain-explorer/commit/83b01446d544ab20519f9135cfb647f64d82fd34))

## [1.1.0-staging](https://github.com/ndau/blockchain-explorer/compare/v1.0.0-staging...v1.1.0-staging) (2022-07-06)


### Features

* **account:** update date-range filter for txs ([709eae1](https://github.com/ndau/blockchain-explorer/commit/709eae168f06b73a3a538a7dd9680b6f3d1d46b2))

## [1.0.0-staging](https://github.com/ndau/blockchain-explorer/compare/v0.1.37-staging...v1.0.0-staging) (2022-07-06)


### ⚠ BREAKING CHANGES

* update homepage layout

### Features

* update homepage layout ([4a21fad](https://github.com/ndau/blockchain-explorer/commit/4a21fadceef28cfb7762c056d0421b066050389f))
