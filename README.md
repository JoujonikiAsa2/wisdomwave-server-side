## 1. WisdomWave ( An e-learning and tutor finding website)<br/>

**Frontend Live link:** <a href="https://wisdomwave-project.netlify.app/">WisdomWave</a> :link:
## Repository
**Client Side:** <a href="https://github.com/JoujonikiAsa2/wisdomwave-client-side">Click Here</a> :link:

## Getting Started Locally

1. Clone this repository to your local machine:

```bash
git clone https://github.com/JoujonikiAsa2/wisdomwave-server-side
```

2. Move to the cloned directory

```bash
cd wisdomwave-server-side
```

3. Install Dependencies

```bash
npm i
```

4. Configure Environment Variables

```bash

DATABASE_LOCAL=mongodb+srv://<username>:<password>@cluster0.ghkhwep.mongodb.net/?retryWrites=true&w=majority
DB_NAME="WisdomWave"
DATABASE_LOCAL_PASSWORD=***********
DATABASE_LOCAL_USERNAME==*********** 	
NODE_ENV=development
CLIENT=https://wisdomwave-project.netlify.app/
LOCAL_CLIENT=http://localhost:5173
ACCESS_TOKEN_SECRET==***********
RUNNING_PORT=5000
STRIPE_KEY==***********
STORE_ID==***********
STORE_PASSWORD==***********
YOUTUBE_CREDENTIALS= ***********
SENDER_EMAIL==***********
APPLICATION_PASSWORD==***********
```

5. Start the local Server:

```bash
nodemon app.js

```
