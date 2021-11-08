import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Container, List, ListItem, ListItemButton, ListItemText, ListItemIcon,
         IconButton, Checkbox, TextField } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { getItems, updateItem, deleteItem, addItem, Item } from './items.services';

import _ from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 25,
    marginTop: 100,
    marginBottom: 100,
    paddingTop: 20,
    paddingBottom: 20,
  },
  addItem: {
    justifyContent: 'center',
    display: 'flex',
    paddingTop: 20,
  },
  listContainer: {
    flex: 1,
    overflow: 'auto',
  },
}));

const ItemElem: React.FC<{item: Item, setItems: Function}> = ({item, setItems}) => {

  const toggleItem = () => {
    item.checked = !item.checked;
    updateItem(item).then((res: {
        data: {
            items: Item[],
        };
    }) => {
      setItems(res.data.items);
    }).catch((err: any) => {});
  };

  const removeItem = () => {
    deleteItem(item.id).then((res: {
        data: {
            items: Item[],
        };
    }) => {
      setItems(res.data.items);
    }).catch((err: any) => {});
  };

  return (
    <ListItem
      key={item.id}
      secondaryAction={
        <IconButton edge="end" onClick={removeItem}>
          <CloseIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton onClick={toggleItem}>
        <ListItemIcon>
          <Checkbox edge="start" checked={item.checked}/>
        </ListItemIcon>
        <ListItemText primary={item.text} />
      </ListItemButton>
    </ListItem>
  );
}

export default function App() {

  const classes = useStyles();

  const [items, setItems] = useState(new Array<Item>());
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    getItems().then((res: {
        data: {
            items: Item[],
        };
    }) => {
      setItems(res.data.items);
    }).catch((err: any) => {});
  }, []);

  const addNewItem = () => {
    if (inputVal.length) {
      addItem(inputVal).then((res: {
        data: {
            items: Item[],
        };
      }) => {
        setInputVal('');
        setItems(res.data.items);
      }).catch((err: any) => {});
    }
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container} style={{display: 'flex'}} maxWidth={'sm'}>
        <div className={classes.listContainer}>
          <List>
            {_.sortBy(items, ['id']).map(item => <ItemElem item={item} setItems={setItems}/>)}
          </List>
        </div>
        <div className={classes.addItem}>
          <TextField
            style={{justifyContent: 'center'}}
            value={inputVal}
            onChange={(ev) => {setInputVal(ev.target.value)}}
            fullWidth
            variant="outlined" 
          />
          <IconButton onClick={addNewItem} edge="end" >
            <KeyboardArrowRightIcon fontSize="large"/>
          </IconButton>
        </div>
      </Container>
    </div>
  );
}
