import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { BrowserRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'

import './app.css'

import Router from './Router'

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		margin: "20px",
	},
})

export default function App() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	function handleChange(event, newValue) {
    setValue(newValue);
  }

	return (
		<Provider store={store}>
			<BrowserRouter>
				<Paper className={classes.root}>
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="primary"
						textColor="primary"
						centered
					>
						<Tab label="Heroes" component={Link} to="/" />
						<Tab label="Comics" component={Link} to="/comics" />
					</Tabs>
				</Paper>
				<Router />
			</BrowserRouter>
		</Provider>
	);
}