import "./App.css";
import {
  Button,
  FormControlLabel,
  Select,
  RadioGroup,
  Radio,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Divider,
  Snackbar,
} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import { PATH_ADD_QUESTION, upload, post, PATH_LOGIN_AUTH, PATH_UPLOAD } from "./api";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    width: 800,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  snInput:{
    width: 80,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  radioGroup: {
    flexDirection: "row",
  },
  flexCenter: {
    display: "flex",
    alignItems: "center",
    verticalAlign: "middle",
    flexDirection: "row",
  },
  answerSelect: {
    textAlign: "center",
  },
  martinTop10: {
    marginTop: theme.spacing(10),
  },
  martinLeft2: {
    marginLeft: theme.spacing(2),
  },
  martinRight2: {
    marginRight: theme.spacing(2),
  },
  submitBtn:{
    width: 100,
    height: 40,
  }
}));

function App() {
  const classes = useStyles();
  const [question,  setQuestion]  = useState("");  // 问题
  const [answer,    setAnswer]    = useState("A"); // 答案
  const [optionA,   setOptionA]   = useState("");  // 选项A
  const [optionB,   setOptionB]   = useState("");  // 选项B
  const [optionC,   setOptionC]   = useState("");  // 选项C
  const [optionD,   setOptionD]   = useState("");  // 选项D
  const [type,      setType]      = useState("0"); // 类型
  const [difficult, setDifficult] = useState("0"); // 难度分数
  const [file,      setFile]      = useState("0"); // 文件
  const [sn,        setSn]        = useState("0"); // 编号

  const [userName,  setUserName]  = useState("");  // 用户名
  const [password,  setPassword]  = useState("");  // 密码

  const [open, setOpen]           = useState(false);
  const [message, setMessage]     = useState('');

  const submit = async () => {
    let media = '-';
    if(type === '1') {
      media = await upload(file)
      setMessage(message);
    }
    post(PATH_ADD_QUESTION, {
      question,     // 问题
      answer,       // 答案
      A:optionA,    // 选项
      B:optionB,    // 选项
      C:optionC,    // 选项
      D:optionD,    // 选项
      type,         // 类型
      difficult,    // 难度
      sn,           // 编号
      media,        // 文件
    }).then((res) => {
      console.log("res", res);
      const {data: { message }} = res;
      setMessage(message);
    });
  };

  useEffect(()=>{
    message && setOpen(true);
  }, [message]);

  useEffect(()=>{
    open || setMessage(undefined);
  }, [open]);

  const login = () => {
    post(PATH_LOGIN_AUTH,{
      "name":     userName,
      "password": password,
    }).then(res=>{
      console.log(res);
      const {data: { message }} = res;
      setMessage(message)
    });
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);    
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>添加问题</h1>
      </header>
      <main>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-full-width-question"
            label="问题"
            style={{ margin: 8 }}
            placeholder="请输入问题"
            fullWidth
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-full-width-option-a"
            label="选项A"
            style={{ margin: 8 }}
            placeholder="请输入选项A"
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-full-width-option-b"
            label="选项B"
            style={{ margin: 8 }}
            placeholder="请输入选项B"
            fullWidth
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-full-width-option-c"
            label="选项C"
            style={{ margin: 8 }}
            placeholder="请输入选项C"
            fullWidth
            value={optionC}
            onChange={(e) => setOptionC(e.target.value)}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-full-width-option-d"
            label="选项D"
            style={{ margin: 8 }}
            placeholder="请输入选项D"
            fullWidth
            value={optionD}
            onChange={(e) => setOptionD(e.target.value)}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">答案</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={answer}
              className={classes.answerSelect}
              onChange={(event, v) => {
                setAnswer(event.target.value);
              }}
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="D">D</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="sn"
            label="题目编号"
            className={`${classes.snInput} ${classes.martinRight2}`}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={sn}
            onChange={(e) => {setSn(e.target.value)}}
          />
          <TextField
            id="difficult-number"
            label="难度分数"
            className={classes.martinRight2}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={difficult}
            onChange={(e) => {setDifficult(e.target.value)}}
          />
          <RadioGroup
            aria-label="type"
            name="type"
            className={classes.radioGroup}
            value={type}
            onChange={(_, v) => {
              setType(v);
            }}
          >
            <FormControlLabel value="0" control={<Radio />} label="普通" />
            <FormControlLabel value="1" control={<Radio />} label="音频" />
          </RadioGroup>
          <div className={classes.flexCenter}>            
            <FormControl              
              className={classes.flexCenter}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            >
              <input type="file" disabled={ type === '0' } />
            </FormControl>            
            <Button className={classes.submitBtn} variant="contained" onClick={submit}>
              提交
            </Button>
          </div>
        </form>
        <div className={`${classes.martinTop10} ${classes.flexCenter}`}>
          <TextField id="filled-username" label="username" variant="filled" 
            value={userName} onChange={e=>setUserName(e.target.value)}
          />
          <TextField
            id="filled-password-input"
            className={
              `${classes.martinLeft2} ${classes.martinRight2}`
            }
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="filled"
            value={password}
            onChange={(e)=>{
              console.log(e)
              setPassword(e.target.value)
            }}
          />
          <Button onClick={login}>登录</Button>
        </div>
      </main>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>           
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

export default App;
