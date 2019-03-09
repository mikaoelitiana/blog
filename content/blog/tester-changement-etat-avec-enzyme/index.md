---
layout: post
title: "Tester un changement d'état dans un composant avec enzyme"
lang: fr
author: mikaoelitiana
date: 2018-04-24T15:09:27+02:00
categories: ["enzyme", "Français", "Javascript", "jest", "react"]
slug: tester-changement-etat-avec-enzyme
excerpt: "
				"
draft: false
meta_title: "Tester un changement d'état dans un composant avec enzyme"
---

En travaillant actuellement sur un projet React, je suis tombé sur une problématique dans un de mes tests fonctionnels où nous utilisons enzyme. Je vous explique tout cela.

### Un composant pour démontrer le problème

Imaginez un composant React qui affiche un texte particulier quand l'état interne du composant a une certaine valeur. Voici un exemple trivial: nous voulons afficher le texte _'😭 It\\'s too late to apologize.'_ quand l'état _expired_ du composant est à _true_. La contrainte est que nous mettons cette valeur à _true_ 1h après avoir monté le composant.
```
import React from 'react'

class Timer extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      expired: false,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ expired: true })
    }, 3600 * 1000);
  }

  render() {
    return (
      <div>
        {this.state.expired ? '😭 It's too late to apologize.' : '😇 Everything is fine.'}
      </div>
    );
  }
}

export default Timer;
```
Imaginez maintenant que je veuille mettre en place un test qui m'assure que ce fonctionnement est toujours valide. En théorie, il faudrait monter le composant et attendre 1h avant de voir si le texte est correctement mis à jour. Il y a surement une manière plus rapide pour gérer cela et c'est là que enzyme montre toute sa force.

### Enzyme et setState à la rescousse

Nous allons mettre en place un test avec enzyme et simuler le changement d'état dans le composant avant de vérifier le texte qui s'affiche. Pour vérifier le texte par défaut, c'est assez simple:
```
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Timer from './Timer';

configure({ adapter: new Adapter() });

it('should display nice text by default', () => {
  const timer = shallow(<Timer />);
  expect(timer.text()).toBe('😇 Everything is fine.');
});

```
Maintenant, pour pouvoir simuler le changement d'état (_expired_) sans attendre 1h, nous allons utiliser [setState](http://airbnb.io/enzyme/docs/api/ShallowWrapper/setState.html#setstatenextstate-callback--self) de enzyme et vérifier ensuite que le texte affiché est bien le second.
```
it('should display bad text when expired', () => {
  const timer = shallow(<Timer />);
  timer.setState({ expired: true });
  expect(timer.text()).toBe('😭 It's too late to apologize.');
});
```
Maintenant, nos tests valident bien le changement d'état dans le composant sans trop de difficulté. ![](./Capture-d’écran-2018-04-24-à-15.05.43.png) N'hésitez pas à laisser un commentaire pour en discuter.