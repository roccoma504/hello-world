import React from 'react';
import MobileTearSheet from '../../../MobileTearSheet';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

const ListExampleChat = () => (
  <MobileTearSheet>
    <List>
      <Subheader>Recent chats</Subheader>
      <ListItem
        primaryText="Brendan Lim"
      />
      <ListItem
        primaryText="Eric Hoffman"
      />
      <ListItem
        primaryText="Grace Ng"
      />
      <ListItem
        primaryText="Kerem Suer"
      />
      <ListItem
        primaryText="Raquel Parrado"
      />
    </List>
    <Divider />
    <List>
      <Subheader>Previous chats</Subheader>
      <ListItem
        primaryText="Chelsea Otakan"
      />
      <ListItem
        primaryText="James Anderson"
      />
    </List>
  </MobileTearSheet>
);

export default ListExampleChat;