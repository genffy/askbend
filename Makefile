TAG ?= latest
PLATFORM ?= linux/amd64,linux/arm64
VERSION ?= latest

CARGO_TARGET_DIR ?= $(CURDIR)/target

lint:
	cargo fmt --all
	cargo clippy --workspace --all-targets -- -D warnings

build:
	cargo build --bin=askbend --release

test:
	cargo test

# Setup dev toolchain
setup:
	bash ./scripts/setup/dev_setup.sh

clean:
	cargo clean

dev-build:
	cargo clean && cargo build && cargo run --package askbend --bin askbend -- -c conf/askbend.toml --rebuild

dev-api:
	cargo run --package askbend --bin askbend -- -c conf/askbend.toml

dev-web:
	cd web && npm run dev