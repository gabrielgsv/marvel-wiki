import React, { useState, useEffect } from 'react';
import superagent from 'superagent'
import paginate from 'paginate-array'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import './index.css'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(3, 2),
		margin: "20px",
	},
	button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

export default function Heroes() {
	const [pagination, setPagination] = useState({
		heroes: [],
		size: 10,
		page: 1,
		currPage: null
	})

	useEffect(() => {
		superagent
			.get('https://gateway.marvel.com:443/v1/public/characters')
			.query({
				ts: 1,
				apikey: '1d82a60886ab3933e99bb422ed1946cc',
				hash: '8a9257e658f2d2ccb08f9b271e1f6082'
			})
			.then(res => {
				const result = res.body.data.results
				console.log(result)

				const curr = paginate(result, pagination.page, pagination.size);

				setPagination({
					...pagination,
					heroes: result,
					currPage: curr
				})

				console.log(pagination)
			})
	}, [])

	function previousPage() {
		const { page, size, heroes } = pagination;

		if (page > 1) {
			const newPage = page - 1;
			const newCurrPage = paginate(heroes, newPage, size);

			setPagination({
				...pagination,
				page: newPage,
				currPage: newCurrPage
			})
		}
	}

	function nextPage() {
		const { currPage, page, size, heroes } = pagination

		console.log(page);
		if (page < currPage.totalPages) {
			const newPage = page + 1;
			const newCurrPage = paginate(heroes, newPage, size);
			setPagination({
				...pagination,
				page: newPage,
				currPage: newCurrPage
			});
		}
	}

	const classes = useStyles()
	const { page, size, currPage } = pagination
	return (
		<Paper className={classes.root}>
			{currPage &&
				<div className="grid">
					{currPage.data.map(hero =>
						<div className="item" key={hero.id}>
							<p>{hero.name}</p>
							<img src={`${hero.thumbnail.path}/portrait_fantastic.${hero.thumbnail.extension}`} />
						</div>)}
				</div>
			}
			<div className="buttonGroup">
				<Button variant="contained" className={classes.button} onClick={() => previousPage(pagination)}>Voltar</Button>
				<Button variant="contained" className={classes.button} onClick={() => nextPage(pagination)}>Proximo</Button>
			</div>
		</Paper>
	)
}
