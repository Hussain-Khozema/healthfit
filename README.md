<a href="https://imgur.com/GWVzKet"><img src="https://i.imgur.com/GWVzKet.png" title="app icon" width="100" height="100" /></a>

# HealthFit

> The application aims to keep track of user’s carbohydrate and calorie intake within the daily recommendation by the Nation Health Survey and provide convenience to planning their exercise routine.

## Installation

### Clone

- Clone or pull this repo to your local machine using `https://gitlab.com/14pw.tanboonhing/healthfit.git`

### Setup

- Change directory to the project directory using command line.

> now install node modules using yarn

```shell
yarn install
```
### Running the app on your device

> run the app

```shell
npx react-native run-android
```

## Troubleshooting

- If there is any error in the building of the application.
- you need to do this everytime before building the application if this solution fixes the issue.


- Change directory to the project directory using command line.

> Do a gradlew clean

```shell
cd android
gradlew clean
```

### if no command 'gradlew' found.
<br>run these command based on OS instead of the above.
<br>if you have already cd android, there is no need to run the same command again.

> Linux / MacOS

```shell
cd android
./gradlew clean
```

> Windows PowerShell

```shell
cd android
.\gradlew clean
```

> Rerun application

```shell
cd ..
npx react-native run-android
```