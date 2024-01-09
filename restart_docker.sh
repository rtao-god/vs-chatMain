echo "installing npm..."
docker exec vs_chat_admin_app npm install
echo "building..."
docker exec vs_chat_admin_app npm run build
echo "restarting..."
docker-compose down
docker-compose up -d --build