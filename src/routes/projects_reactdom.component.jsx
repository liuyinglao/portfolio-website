import { Link } from "react-router-dom";

function ReactDomFeatureList() {
    const games = [
        {
            name: "Ori and Blind Forest",
            rating: 5,
            link: "https://google.com",
        },
        {
            name: "Ori and Will of Wisps",
            rating: 5,
            link: "https://google.com",
        },
        {
            name: "Mario Party",
            rating: 5,
            link: "https://playtorch.dev/",
        },
    ];
    const listItems = games.map((item) => (
        <div>
            <Link to={item.link}>
                <h1>{item.name}</h1>
            </Link>
            <p>{'⭐️ '.repeat(item.rating) }</p>
        </div>
    ));
    return <ul>{listItems}</ul>;
}

export default ReactDomFeatureList;