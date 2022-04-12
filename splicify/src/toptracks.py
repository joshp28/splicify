# SET SPOTIPY_CLIENT_ID='1065d1fc90714ae18996972cb4abd133'
# SET SPOTIPY_CLIENT_SECRET='df5be2fc572f43fd8943f4f9a00b6fd8'
# SET SPOTIPY_REDIRECT_URI='http://localhost:8888/callback'

# import spotipy
# import os
# from spotipy.oauth2 import SpotifyOAuth



# scope = "user-library-read"
# cid = '1065d1fc90714ae18996972cb4abd133'
# secret = 'df5be2fc572f43fd8943f4f9a00b6fd8'

# os.environ['SPOTIPY_CLIENT_ID']= cid
# os.environ['SPOTIPY_CLIENT_SECRET']= secret
# os.environ['SPOTIPY_REDIRECT_URI']='http://localhost:8888/callback'
# sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))

# results = sp.current_user_saved_tracks()
# for idx, item in enumerate(results['items']):
#     track = item['track']
#     print(idx, track['artists'][0]['name'], " – ", track['name'])



# -----------------------------------------------------------------------------------------------


import requests
import time
import spotipy
import spotipy.util as util
import os
import json

from pprint import pprint



# SPOTIFY_GET_CURRENT_TRACK_URL = 'https://api.spotify.com/v1/me/player/currently-playing'
# SPOTIFY_GET_CURRENT_TRACK_URL = 'https://api.spotify.com/v1/me/'
# SPOTIFY_GET_CURRENT_TRACK_URL = '	https://api.spotify.com/v1/me/player/recently-played'
SPOTIFY_LOGOUT_URL = 'https://www.spotify.com/fr/logout'
SPOTIFY_GET_CURRENT_TRACK_URL = 'https://api.spotify.com/v1/me/top/tracks?limit=25'
# ACCESS_TOKEN = 'BQB0LLWcGqQ5kl3xiyDJzphpd_vCmAJlIeYaGGLDks9x4D3A9-90AqC1G3hAw7scLjcnuY8IHGb1KSyq2exyuJgI5p3-J24J9Pxk3mwX0ofMZeeF5mRp0rRB71Bh6Fg3Al3MgQKjjVXxFur2JUtPicY'
ACCESS_TOKEN = util.prompt_for_user_token('',
                           'user-top-read',
                           client_id='1065d1fc90714ae18996972cb4abd133',
                           client_secret='df5be2fc572f43fd8943f4f9a00b6fd8',
                           redirect_uri='http://localhost:8888/callback')

def get_current_track(access_token):
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
        # print(i)
        artist_names = ''
        for x in i['artists']:
            artist_names += x['name']
            artist_names += '; '
        # artist_names -= ', '
        # response += '{\nsong title: ' + i['name'] + '\nsong artist: ' + i['artists'][0]['name'] + '\nimage url: ' + i['album']['images'][0]['url'] + '\n}\n'
        response += '{\nsong title: ' + i['name'] + '\nsong artist: ' + artist_names + '\nimage url: ' + i['album']['images'][0]['url'] + '\n'
        if i['preview_url'] != None:
            response += 'preview_url: ' + i['preview_url'] +'\n}\n'
        else:
            response += '\n}\n'
        current_song = {
            'song title': i['name'],
            'song artist': artist_names,
            'album name': i['album']['name'],
            'image url': i['album']['images'][0]['url'],
            'preview url': i['preview_url']

        }
        songs.append(current_song)
        # with open("spotify_info.txt", "a") as out_file:
        #     out_file.write(json.dumps(current_song))
            # pprint(current_song, out_file)
        print(response)

    # track_id = json_resp['item']['id']
    # track_name = json_resp['item']['name']
    # artists = [artist for artist in json_resp['item']['artists']]

    # link = json_resp['item']['external_urls']['spotify']

    # -------------------------------------------------------------------

    # artist_names = ', '.join([artist['name'] for artist in artists])

    # current_track_info = {
    #     "id": track_id,
    #     "track_name": track_name,
    #     "artists": artist_names,
    #     "link": link
    # }

    # return current_track_info
    # return response
    return songs
    # --------------------------------------------------------


def main():
    if os.path.exists("spotify_info.txt"):
        os.remove("spotify_info.txt")
    
    current_track_id = None
    # while True:
    current_track_info = get_current_track(ACCESS_TOKEN)
    final_dict = {
        'songs': current_track_info
    }
    with open("spotify_info.txt", "a") as out_file:
            out_file.write(json.dumps(final_dict))
    with open("spotify_info.txt") as oop:
        json_data = json.load(oop)
        # print(json_data)
    # print(current_track_info)
        
        # if current_track_info['id'] != cu

        # if current_track_info['id'] != current_track_id:
        #     pprint(
        #         current_track_info,
        #         indent=4,
        #     )
        #     current_track_id = current_track_info['id']

        # time.sleep(1)
    if os.path.exists(".cache"):
        os.remove('.cache')
    


if __name__ == '__main__':
    main()