import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import subprocess
import argparse
import os

class Watcher:
    def __init__(self, file_to_run):
        self.file_to_run = file_to_run
        self.directory_to_watch = os.path.dirname(file_to_run)
        self.observer = Observer()

    def run(self):
        event_handler = Handler(self.file_to_run)
        self.observer.schedule(event_handler, self.directory_to_watch, recursive=False)
        self.observer.start()
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            self.observer.stop()
        self.observer.join()

class Handler(FileSystemEventHandler):
    def __init__(self, file_to_run):
        self.file_to_run = file_to_run

    def on_modified(self, event):
        if event.src_path == self.file_to_run:
            print(f'{self.file_to_run} has been modified, running the script...')
            subprocess.run(["python", self.file_to_run])

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Watch a file in the 'src' directory and execute it on modification")
    parser.add_argument("file", help="The Python file to watch in the 'src' directory")
    args = parser.parse_args()

    # Prepend 'src/' to the file name
    file_to_run = os.path.abspath(os.path.join("src", args.file))
    watcher = Watcher(file_to_run)
    watcher.run()
