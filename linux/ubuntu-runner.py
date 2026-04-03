import subprocess
import os

class EngineLauncher:

    def run_hidden(self, command):
        subprocess.Popen(
            command,
            shell=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )

    def start_ubuntu(self):
        print("Starting Ubuntu...")
        self.run_hidden("proot-distro login ubuntu")

    def start_windows(self):
        print("Starting Windows...")
        self.run_hidden("box64 wine explorer")

# App simulation
if __name__ == "__main__":
    app = EngineLauncher()

    print("=== Engine Launcher ===")
    print("1. Start Ubuntu")
    print("2. Start Windows")

    choice = input("Select: ")

    if choice == "1":
        app.start_ubuntu()
    elif choice == "2":
        app.start_windows()
    else:
        print("Invalid option")
