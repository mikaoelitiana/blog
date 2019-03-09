---
layout: post
title: "Mutations GraphQL en arrière-plan sur React Native"
lang: fr
author: mikaoelitiana
date: 2018-07-12T17:41:11+02:00
categories: ["apollo", "Français", "graphql", "Javascript", "React Native", "react-native"]
slug: mutations-graphql-en-arriere-plan-sur-react-native
excerpt: "
				"
draft: false
meta_title: "Mutations GraphQL en arrière-plan sur React Native"
---

[GraphQL](https://graphql.org/) est un langage très puissant simplifiant les échanges de données entre une application et un serveur distant. Je l'ai utilisé avec React Native pour récupérer les données à afficher sur une vue. Cependant GraphQL permet aussi d'envoyer des données vers un serveur, on parle alors de [_Mutations_](https://graphql.org/learn/queries/#mutations).

## La problématique

La qualité de réseau et l'accès à internet ne sont pas toujours assurés sur un appareil mobile puisque l'utilisateur se déplace. Ainsi, il y a plus de chance que la synchronisation avec le serveur échoue. Cela peut poser des problème, en particulier si l'utilisateur essaie d'envoyer des données vers le serveur (mutation). Nous voulons donc mettre en place un système qui renvoie les mutations tant qu'elles n'ont pas été délivrées au serveur. Nous allons faire en sorte que ce système fonctionne que l'application soit ouverte ou en arrière-plan.

## Configurer React Apollo

[React Apollo](https://github.com/apollographql/react-apollo) est une librairie qui permet d'utiliser [Apollo](https://www.apollographql.com), un client GraphQL, dans React. Apollo offre toutes les fonctionnalités pour exploiter facilement GraphQL. Il possède plusieurs extensions qui améliorent l’expérience et permettent de résoudre différentes problématiques. Pour commencer, nous allons configurer un client avec Apollo et y ajouter les fonctionnalités dont nous avons besoin.
```
import Config from 'react-native-config';
import { AsyncStorage } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { RetryLink } from 'apollo-link-retry';
import ReduxLink from 'apollo-link-redux';

// Polyfill to fix https://github.com/apollographql/apollo-client/issues/3236
Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
};

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network',
  },
  query: {
    fetchPolicy: 'cache-and-network',
  },
};

const httpLink = createHttpLink({
  uri: Config.GRAPHQL_URL,
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('app:token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const retryMore = ['updateStatusMutation'];
const retryLink = new RetryLink({
  attempts: (count, operation, error) => {
    return count < 6 || (!!error && retryMore.includes(operation.operationName));
  },
  delay: {
    max: 15000
  }
});

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: AsyncStorage,
});

const createClient = (store) => {
  const link = ApolloLink.from([
    retryLink,
    new ReduxLink(store),
    authLink,
    httpLink,
  ]);

  const client = new ApolloClient({
    link,
    cache,
    defaultOptions,
  });

  return client;
};

export default createClient;
```
Les librairies qui contiennent "link" dans leur nom sont des extensions de Apollo. Nous allons nous concentrer sur _RetryLink_ qui permet de définir les conditions dans lesquelles il faut réessayer une requête suite à une erreur. Nous définissons ainsi une fonction dans la propriété _attemps._ Celle-ci est exécutée après chaque erreur pour déterminer si il faut lancer une nouvelle tentative ou non. Nous voyons alors deux conditions ci-dessus : soit le nombre de tentative est inférieur à 6, soit le nom de l'opération fait partie d'une liste que nous définissons.

## Executer les mutations

Maintenant que le client est bien configuré, nous l'utilisons dans notre application en enveloppant celle-ci dans _ApolloProvider_.
```
import React, { Component } from 'react';
import codePush from 'react-native-code-push';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';
import createStore from './store';
import RootStack from './navigators';
import createClient from './client';

const { store, persistor } = createStore();
const apolloClient = createClient(store);


class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApolloProvider client={apolloClient}>
            <RootStack />
          </ApolloProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

```
Ensuite, dans les vues, nous utilisons le composant [Mutation](https://www.apollographql.com/docs/react/essentials/mutations.html) qui permet de lancer une mise à jour vers le serveur. Voici un exemple :
```
// ...
import gql from 'graphql-tag';

const UPDATE_STATUS = gql`mutation updateStatusMutation($params: [StatusHistoryInputTypeQl]) {
  updateStatusMutation(params: $params) {
    newStatusId
    newStatusDescription
  }
}`

// ...
                  <Mutation mutation={UPDATE_STATUS}
                    >
                      {(updateStatus, { data }) => {
                        return <StatusSelector statuses={statuses} currentStatus={currentStatus} onSelect={(index) => {
                            updateStatus({
                              variables: {
                                params: [
                                  {
                                    oldStatusId: this.state.currentStatus,
                                    newStatusId: index,
                                  }
                                ]
                              }
                            });
                          }}
                        />;
                      }}
                    </Mutation>

// ...
```
Le nom de la mutation est précisé après le mot clé _mutation_ que nous voyons ci-dessus. Nous avions ajouté ce nom lors de la configuration du client dans le paragraphe précédent. De ce fait, si il y a une erreur réseau et que la mutation n'est pas correctement envoyée, l'application relance la mutation. Cependant, cette solution ne fonctionne que quand l'application est ouverte. Si l'utilisateur bascule sur une autre application, la fonction qui relance la tentative n'est plus appelée.

## Lancer les mutations en arrière-plan

Pour remédier à ce dernier problème, nous allons configurer notre application pour s’exécuter en arrière-plan. La librairie [react-native-brackground-job](https://github.com/vikeri/react-native-background-job) permet de faire cela facilement.  Nous installons cette librairie et la lions au projet React Native en lançant les commandes ci-dessous:
```
yarn add react-native-background-job # ou npm install react-native-background-job --save
react-native link react-native-background-job
```
Nous déclarons ensuite un ou plusieurs travaux (_jobs_) qui doivent être exécutés en arrière-plan.
```
import BackgroundJob from 'react-native-background-job';

export const mutationSync = 'mutationSync';

const registerBackgroundJobs  = () => {
  // An empty background job that keeps the app running
  BackgroundJob.register({
    jobKey: mutationSync,
    job: () => {}
  });
  return;
};

export default registerBackgroundJobs;
```
La fonction que nous définissons dans l'attribut _job_ sera exécutée en arrière-plan. Dans notre cas, nous plaçons juste une fonction vide qui est suffisante pour garder l'application en marche en arrière-plan. Nous modifions alors _index.js_ (_index.android.js_ ou _index.ios.js_ selon les cas) pour enregistrer les travaux comme suit:
```
import { AppRegistry } from 'react-native';
import App from './App';
import registerBackgroundJobs from './background-jobs';

// Registers background jobs
registerBackgroundJobs();

AppRegistry.registerComponent('MyApp', () => App);


```
Enfin, dans le composant _App_, nous lançons les travaux en arrière-plans quand le composant est monté (dans _componentDidMount_). Nous ajoutons alors le code suivant dans la définition de App:
```
// ...
import { mutationSync } from './app/lib/background-jobs';

// ...
class App extends Component {
  componentDidMount() {
    BackgroundJob.schedule({
      jobKey: mutationSync,
      period: 60 * 1000,
      timeout: 10000,
      exact: true
    });
  }
// ...
```
Comme on peut le voir, nous appelons _BackgroundJob.schedule_ qui initialise les travaux en arrière-plan et s'exécute toutes les minutes.

## Conclusion

Maintenant, quand l'application passe en arrière-plan et que des mutations n'ont pas été correctement envoyées, elles sont relancées automatiquement. Notre application continue ainsi à fonctionner comme il faut et à envoyer les données peu importe les conditions d'accès au réseau. Nous assurons ainsi autant que possible que toutes les modifications initialisées dans l'application sont bien transmises au serveur.