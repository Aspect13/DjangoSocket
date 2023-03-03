up:
	docker compose up -d
	cd ./react-socket && npm run dev -- --host

down:
	docker compose down

restart:
	make down && make up
