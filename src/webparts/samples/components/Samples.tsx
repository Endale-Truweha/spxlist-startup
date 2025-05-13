

import * as React from 'react';
//import styles from './Samples.module.scss';
import type { ISamplesProps } from './ISamplesProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import { useEffect } from 'react';
import { getSP } from '../../../pnpjsConfig';
//import { IFAQ } from '../../../interfaces';
import { SPFI } from '@pnp/sp';
const Samples =(props:ISamplesProps) => {

  //const LOG_SOURCE = 'FAQ Webpart';
  const LIST_NAME = 'FAQ';
  let _sp:SPFI = getSP(props.context);

const [items, setItems] = React.useState<any>();


  const getFAQItems = async () => {

    console.log('context',_sp)
    const item = _sp.web.lists.getByTitle(LIST_NAME).items.select("Id", "Title", "Body", "Letter")
    .top(500)
    .orderBy("Modified", false)();
    

    console.log('FAQ Items',item)

return item;
  }

  useEffect(() => {

    getFAQItems().then((data) => {return setItems(data);}).catch((error) => {
      console.error('Failed to fetch FAQ items:', error);
    });
    
  
  },[])

  return (
  
  <div>

    <div>
      {JSON.stringify(items)}
      </div>
  </div>
)
}

export default Samples
/* 
export default class Samples extends React.Component<ISamplesProps> {
  public render(): React.ReactElement<ISamplesProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.samples} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
        </div>
        <div>
          <h3>Welcome to SharePoint Framework!</h3>
          <p>
            The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
          </p>
          <h4>Learn more about SPFx development:</h4>
          <ul className={styles.links}>
            <li><a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">SharePoint Framework Overview</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank" rel="noreferrer">Use Microsoft Graph in your solution</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank" rel="noreferrer">Build for Microsoft Teams using SharePoint Framework</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank" rel="noreferrer">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank" rel="noreferrer">Publish SharePoint Framework applications to the marketplace</a></li>
            <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank" rel="noreferrer">SharePoint Framework API reference</a></li>
            <li><a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">Microsoft 365 Developer Community</a></li>
          </ul>
        </div>
      </section>
    );
  }
}
 */