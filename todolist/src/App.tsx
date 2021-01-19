import React,{useState} from 'react';
import './App.css';
import {useAPI,fetch} from './rapper';

import{List,ListItem,ListItemText,TextField,Button, CircularProgress, ListItemSecondaryAction} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline'
import { useStore } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
  }),
);
let todolist=[{id:1,name:'TODO:1',modify:true},{id:2,name:'TODO:2',modify:true},{id:3,name:'TODO:3',modify:true}];
let newId=4;
function App() {
  const classes = useStyles();
  const[timestamp,setTimestamp]=useState(0)
  const[data]=useAPI['GET/todo/list']()
  const [todoName,setToDoName]=useState('')
  const [modifyName,setmodifyName]=useState('')
  const [searchName,setsearchName]=useState('')
 // const [isModify,setisModify]=useState(false)
  const[loading,setLoading]=useState(false)
  const createTodoHandler=async()=>{
    // setLoading(true)
    // await fetch['PUT/todo']({name:todoName})
    // setLoading(false)
    // setToDoName('')
    // setTimestamp(Date.now())
    setLoading(true)
    let item={
      id:newId,
      name:'TODO:'+todoName,
      modify:true
    }
    console.log(item)
    todolist.push(item)
    newId++
    setLoading(false)
    setToDoName('')
    setTimestamp(Date.now())
  }

  const deleteTodoHandler=async(id:number)=>{
    // setLoading(true)
    // await fetch['DELETE/todo']({id})
    // setLoading(false)
    // setTimestamp(Date.now())
    setLoading(true)
    todolist.forEach((item,index,todolist)=>{
      if(item.id===id){
        todolist.splice(index,1)
      }
    })
    setLoading(false)
    setTimestamp(Date.now())
  }

  const modifyTodoHandler=(x: { id: any; name: any; })=>{
    setLoading(true)
    console.log(x,"jin")
    todolist.forEach((item,index)=>{
      if(item.id===x.id){
        item.modify=false;
        setmodifyName(item.name)
        // let it=item;
        // it.name=modifyName;
        // it.modify=true
        // todolist.splice(index,1,it)
      }
    })
  
    setLoading(false)
    setTimestamp(Date.now())
  }

  const searchTodoHandler=(searchName:string)=>{
    // setLoading(true)
    // await fetch['DELETE/todo']({id})
    // setLoading(false)
    // setTimestamp(Date.now())
    setLoading(true)
    var tem:any[]=[]
    console.log("搜索",searchName)
    todolist.forEach((item)=>{
      console.log(item.name)
      if((item.name)===("TODO:"+searchName)){
       tem.push(item);
       console.log(tem)
      }
    })
    todolist=tem;
    setLoading(false)
    setTimestamp(Date.now())
  }

  const modifyHandler=(id:number)=>{
    if(modifyName!==''){
      todolist.forEach((item,index)=>{
        if(item.id===id){
          let it=item;
          it.name="TODO:"+modifyName;
          it.modify=true
          console.log(it)
          todolist.splice(index,1,it)
          console.log(todolist)
        }
      })
      setLoading(false)
    }
   
  }

  return (
    <div className="App">
      {loading &&<CircularProgress style={{margin:8}}/>}
      <TextField
          value={searchName}
          onChange={e=>setsearchName(e.target.value)}/>
      <Button
        variant="outlined"
        color="secondary"
        onClick={()=>searchTodoHandler(searchName)}>
        Search
      </Button>
     <List>
       {todolist.map(x=>
       <ListItem key={x.id}>
        {(x.modify===true)?
          (<ListItemText primary={x.name}
            onClick={()=>modifyTodoHandler(x)}/>):
         (<TextField
          value={modifyName}
          onChange={e=>setmodifyName(e.target.value)}/>
          )}
      <Button
        variant="outlined"
        color="secondary"
        onClick={()=>modifyHandler(x.id)}>
        Save
      </Button>
   
         {/* <ListItemSecondaryAction>
           <RemoveIcon onClick={()=>deleteTodoHandler(x.id)} />
         </ListItemSecondaryAction> */}
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={()=>deleteTodoHandler(x.id)}>
        Delete
      </Button>
       </ListItem>)}
       
     </List>
     <div className="control">
       <TextField
          placeholder="请输入todo的名称"
          value={todoName}
          onChange={e=>setToDoName(e.target.value)}/>
    <Button variant="outlined"
            color="primary"
            disabled={todoName.trim()===''}
            style={{marginLeft:8}}
            onClick={createTodoHandler}>
              ADD
    </Button>
     </div>
    </div>
  );
}

export default App;
