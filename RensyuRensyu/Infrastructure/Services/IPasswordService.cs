using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace RensyuRensyu.Infrastructure.Services
{

    public interface IPasswordService
    {
        /// <summary>
        /// ハッシュ化
        /// 平文パスワードを渡すとハッシュ化パスワード、使用されたソルトが返る
        /// </summary>
        /// <param name="rawPassword">平文パスワード</param>
        /// <returns></returns>
        public (string hashedPassword, byte[] salt) HashPassword(string rawPassword);

        /// <summary>
        /// 認証
        /// ハッシュ化パスワード、平文パスワード・ソルトを渡すと正しいパスワードなら true が返る
        /// </summary>
        /// <param name="hashedPassword">ハッシュ化パスワード</param>
        /// <param name="rawPassword">平文パスワード</param>
        /// <param name="salt">ソルト</param>
        /// <returns>正しいパスワードなら true</returns>
        public bool VerifyPassword(string hashedPassword, string rawPassword, byte[] salt);
    }

    public class PasswordService : IPasswordService
    {
        public (string hashedPassword, byte[] salt) HashPassword(string rawPassword)
        {
            byte[] salt = GetSalt();
            string hashed = HashPassword(rawPassword, salt);
            return (hashed, salt);
        }

        public bool VerifyPassword(string hashedPassword, string rawPassword, byte[] salt) =>
          hashedPassword == HashPassword(rawPassword, salt);

        private string HashPassword(string rawPassword, byte[] salt) =>
          Convert.ToBase64String(
            KeyDerivation.Pbkdf2(
              password: rawPassword,
              salt: salt,
              prf: KeyDerivationPrf.HMACSHA512,
              iterationCount: 10000,
              numBytesRequested: 256 / 8));

        private byte[] GetSalt()
        {
            using var gen = RandomNumberGenerator.Create();
            var salt = new byte[128 / 8];
            gen.GetBytes(salt);
            return salt;
        }
    }
}
