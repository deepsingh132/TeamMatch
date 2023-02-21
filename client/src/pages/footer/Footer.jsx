import "./footer.css";

const Footer = () => {

    var today = new Date();

    return (
        <footer className="container">
            <div className="row justify-content-center mt-2 mb-2">
                <div className="col-8">
                    <h5>TeamMatch - {today.getFullYear()}</h5>
                </div>
            </div>
        </footer>
    );
}

export default Footer;