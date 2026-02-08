export default function TailwindFilters() {
    return (
        <div>
            <div>
                <h3>Blurs</h3>
                <div className="flex">
                    <img className="blur-none w-1/4" src="/images/reactjs.jpg" alt="No blur" />
                    <img className="blur-sm w-1/4" src="/images/reactjs.jpg" alt="Small blur" />
                    <img className="blur-lg w-1/4" src="/images/reactjs.jpg" alt="Large blur" />
                    <img className="blur-2xl w-1/4" src="/images/reactjs.jpg" alt="2XL blur" />
                </div>
            </div>
        </div>
    );
}