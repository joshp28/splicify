import requests
import time
import spotipy
import spotipy.util as util
import os
import json

from pprint import pprint


SPOTIFY_LOGOUT_URL = 'https://www.spotify.com/fr/logout'
SPOTIFY_GET_CURRENT_TRACK_URL = 'https://api.spotify.com/v1/me/top/tracks'
ACCESS_TOKEN = util.prompt_for_user_token('',
                           'user-top-read',
                           client_id='1065d1fc90714ae18996972cb4abd133',
                           client_secret='df5be2fc572f43fd8943f4f9a00b6fd8',
                           redirect_uri='http://localhost:8888/callback')

def get_top_tracks(access_token):
    response = requests.get(
        SPOTIFY_GET_CURRENT_TRACK_URL,
        headers={
            "Authorization": f"Bearer {access_token}"
        }
    )
    json_resp = response.json()
    # print(json_resp['items'][0])

    first = json_resp['items'][2]['name']

    # print(first)

    song_list = json_resp['items']
    # song_list = []
    response = ''
    songs = []
    current_song = {}

    for i in song_list:
        artist_names = ''
        
        for idx, x in enumerate(i['artists']):
            artist_names += x['name']
            if (idx < len(i['artists']) - 1):
                artist_names += ' and '
        artist_names.replace(', ', '')
        response += "{ song_title: " + i['name'] + " song_artist: " + artist_names + " image_url: " + i['album']['images'][0]['url'] + " "
        if i['preview_url'] != None:
            response += 'preview_url: ' + i['preview_url']
        else:
            response += '}'
        current_song = {
            'song_title': i['name'],
            'song_artist': artist_names,
            'album_name': i['album']['name'],
            'image_url': i['album']['images'][0]['url'],
            'preview_url': i['preview_url'],
            'track_url': i['external_urls']['spotify']

        }
        
        songs.append(current_song)
        print(response.encode("UTF-8"))
        print("\n")

    spotipy_data = {
        'songs': songs
    }

    json_string = json.dumps(spotipy_data)
    with open('./src/spotify_info.json', 'w') as out:
        json.dump(json_string, out)

    return songs
    # --------------------------------------------------------


def main():
    x = 0
    if os.path.exists("spotify_info.txt"):
        os.remove("spotify_info.txt")
    
    current_track_id = None
    # while True:
    if x==0:
        current_track_info = get_top_tracks(ACCESS_TOKEN)
    x = x + 1
    final_dict = {
        'songs': current_track_info
    }
    
    with open("spotify_info.txt", "a") as out_file:
            out_file.write(json.dumps(final_dict))
    with open("spotify_info.txt") as oop:
        json_data = json.load(oop)
    
    if os.path.exists(".cache"):
        os.remove('.cache')
    

    


if __name__ == '__main__':
    main()