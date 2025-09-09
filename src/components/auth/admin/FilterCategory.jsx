import { Grid, TextField } from "@mui/material"


const FilterCategory = ({ name, email, setName, setEmail }) => {

    return (
        <div className="px-5">
            <Grid container paddingTop={5}>
                <Grid size={3}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="w-72"
                    />
                </Grid>
                <Grid size={3}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="w-72"
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default FilterCategory